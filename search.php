<?php

$p = json_decode(file_get_contents("parameters.json"), true);

$dir = $p['music_dir'];
$s = $_GET['s'];

if(preg_match("/^\s*$/",$s)==1) {
	exit;
}

$s = preg_split("/\ /",$s);
$command = '/usr/bin/find -H '.$dir.' -type f -name "*.mp3" -regextype posix-extended -iregex ".*'.$s[0].'.*"';
for($i=1;$i<count($s);$i++) {
	$command .= ' | grep -i "'.$s[$i].'"';
}
exec($command.' | head -n100', $output);
sort($output, SORT_NATURAL);
for($i=0;$i<count($output);$i++) {
	$output[$i] = str_replace($dir,$p['root_url'],$output[$i]);
}

$response = array("data"=>$output);

header('Content-Type: text/json; charset=UTF-8');
echo(json_encode($response));

?>
