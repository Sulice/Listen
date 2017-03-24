<?php

require_once('mp3.php');
require_once('findMP3.php');

$p = json_decode(file_get_contents("parameters.json"), true);

$dir = $p['music_dir'];
if(isset($_GET['d'])) {
	$d = urldecode($_GET['d']);
}

$output = findMP3($dir."/".$d);
shuffle($output);
$output = array_slice($output, 0, 50);

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
$response = json_encode(array("data"=>$results));
header('Content-Type: text/json; charset=UTF-8');
echo($response);

?>
