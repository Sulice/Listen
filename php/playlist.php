<?php

require_once('mp3.php');

$p = json_decode(file_get_contents("parameters.json"), true);
$dir = $p['music_dir'];
$p['root_url'] = "/php/read.php?q=";

$playlist = json_decode($_POST['playlist'], true);

$results = [];
for ($i = 0; $i < count($playlist); $i++) {
    if (is_dir($playlist[$i])) {
        $e = preg_replace("/\/+/", "/", $playlist[$i]);
        $results[] = array(
            str_replace($dir, "/", $e)
        );
    } else {
        $mp3file = new fastMP3File($playlist[$i]);
        $results[] = array(
            str_replace($dir, $p['root_url'], $playlist[$i]),
            $mp3file->getDuration()
        );
    }
}

// output result as json
$response = json_encode(["data" => $results, "query" => $q]);
header('Content-Type: text/json; charset=UTF-8');
echo($response);
