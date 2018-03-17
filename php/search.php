<?php

require_once('mp3.php');
require_once('findMP3.php');

$p = json_decode(file_get_contents("parameters.json"), true);

$dir = $p['music_dir'];
$p['root_url'] = "/php/read.php?q=";
$q = urldecode($_GET['q']);
$d = urldecode($_GET['d']);

// if nothing in query, return nothing
if (preg_match("/^\s*$/", $q) == 1) {
    exit;
}

// first we separate terms of search (with spaces)
$s = explode(" ", $q);

// find all mp3 files
$files = findMP3($dir."/".$d);

// create filter function
function create_filter($filter, $inverse)
{
    return function ($str) use ($filter, $inverse) {
        if ($inverse) {
            return !(preg_match('/'.$filter.'/i', $str));
        } else {
            return preg_match('/'.$filter.'/i', $str);
        }
    };
}

// find lines where ALL search terms appear (or don't appear following first char of filter)
for ($i = 0; $i < count($s); $i++) {
    if (mb_substr($s[$i], 0, 1) === "-") {
        $filter = mb_substr($s[$i], 1);
        $inverse = true;
    } else {
        $filter = $s[$i];
        $inverse = false;
    }
    $filter = create_filter($filter, $inverse);
    $files = array_filter($files, $filter);
}

// sort
natsort($files);

// only keep the first results (this is done to minimize memory usage and maximize speed)
$files = array_slice($files, 0, 50);

// replace root_url with music_dir (cf parameters.json)
// get file duration when mp3 file
$results = [];
for ($i = 0; $i < count($files); $i++) {
    if (is_dir($files[$i])) {
        $e = preg_replace("/\/+/", "/", $files[$i]);
        $results[] = array(
            str_replace($dir, "/", $e)
        );
    } else {
        $mp3file = new fastMP3File($files[$i]);
        $results[] = array(
            str_replace($dir, $p['root_url'], $files[$i]),
            $mp3file->getDuration()
        );
    }
}

// output result as json
$response = json_encode(array("data"=>$results, "query"=>$q));
header('Content-Type: text/json; charset=UTF-8');
echo($response);

?>
