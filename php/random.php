<?php

require_once('mp3.php');

$p = json_decode(file_get_contents("parameters.json"), true);

$dir = $p['music_dir'];
$d = urldecode($_GET['d']);

// find all mp3 files
$command = 'find "'.$dir.'/'.$d.'" -type f -name "*.mp3"';

// sort randomly
$command = $command.' | sort -Rfiu';

// only keep the first results (this is done to minimize memory usage and maximize speed)
$command = $command.' | head -n100';

// execute command
exec($command, $output);

// replace root_url with music_dir (cf parameters.json)
// get file duration
$results = [];
for($i=0;$i<count($output);$i++) {
    $mp3file = new fastMP3File($output[$i]);
    $results[] = array(
        str_replace($dir,$p['root_url'],$output[$i]),
        $mp3file->getDuration()
    );
}

// output result as json
$response = json_encode(array("data"=>$results, "query"=>$q));
header('Content-Type: text/json; charset=UTF-8');
echo($response);

?>
