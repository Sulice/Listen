<?php

require_once('mp3.php');
require_once('findMP3.php');

$p = json_decode(file_get_contents("parameters.json"), true);

$dir = $p['music_dir'];
$q = urldecode($_GET['q']);
$d = urldecode($_GET['d']);

// if nothing in query, return nothing
if(preg_match("/^\s*$/",$q)==1) {
	exit;
}

// first we separate terms of search (with spaces)
$s = explode(" ",$q);

// find all mp3 files
$files = findMP3($dir."/".$d);

function create_filter($filter) {
    return function($str) use($filter) {
        return preg_match('/'.$filter.'/i', $str);
    };
}

// find lines where ALL search terms appear
for($i = 0; $i < count($s); $i++) {
    $filter = create_filter($s[$i]);
    $files = array_filter($files, $filter);
}

// sort
natsort($files);

// only keep the first results (this is done to minimize memory usage and maximize speed)
$files = array_slice($files, 0, 50);

// replace root_url with music_dir (cf parameters.json)
// get file duration
$results = [];
for($i=0;$i<count($files);$i++) {
    $mp3file = new fastMP3File($files[$i]);
    $results[] = array(
        str_replace($dir,$p['root_url'],$files[$i]),
        $mp3file->getDuration()
    );
}

// output result as json
$response = json_encode(array("data"=>$results, "query"=>$q));
header('Content-Type: text/json; charset=UTF-8');
echo($response);

?>
