<?php

$p = json_decode(file_get_contents("parameters.json"), true);

$dir = $p['music_dir'];
$s = urldecode($_GET['s']);

// if nothing in query, return nothing
if(preg_match("/^\s*$/",$s)==1) {
	exit;
}

// first we separate terms of search (with spaces)
$s = explode(" ",$s);

// find all mp3 files
$command = 'find '.$dir.' -type f -name "*.mp3"';

// find lines where ALL search terms appear
for($i=0;$i<count($s);$i++) {
	$command .= ' | grep -i "'.$s[$i].'"';
}

// sort
$command = $command.' | sort -fiu';

// only keep the first results (this is done to minimize memory usage)
$command = $command.' | head -n200';

// execute command
exec($command, $output);

// replace root_url with music_dir (cf parameters.json)
for($i=0;$i<count($output);$i++) {
	$output[$i] = str_replace($dir,$p['root_url'],$output[$i]);
}

// output result as json
$response = array("data"=>$output);
header('Content-Type: text/json; charset=UTF-8');
echo(json_encode($response));

?>
