<?php

$p = json_decode(file_get_contents("parameters.json"), true);
$q = urldecode($_GET['q']);

if (file_exists($p['music_dir']."/".$q)) {
    header("Content-Type: audio/mpeg");
    readfile($p['music_dir']."/".$q);
} else {
    header("HTTP/1.1 404 Not Found");
    echo "404 Not Found";
}
