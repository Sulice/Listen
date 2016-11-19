<?php

$p = json_decode(file_get_contents("parameters.json"), true);

$dir = $p['music_dir'];
$s = urldecode($_GET['s']);

// prevent going back in dir tree
$s = preg_replace('/\/\.\.\//',"",$s);
$s = str_replace($dir,"",$s);

$location = $dir.$s;
$entries = scandir($location);
$display = [];
foreach($entries as $e) {
	if(pathinfo($e, PATHINFO_EXTENSION) == "mp3" || is_dir($location."/".$e)) {
		if($e != "." && $e != "..") {
            if(pathinfo($e, PATHINFO_EXTENSION) == "mp3") {
                $e = preg_replace("/\/+/","/",$location."/".$e);
                $display[] = str_replace($dir,$p['root_url'],$e);
            } else {
                $display[] = preg_replace("/\/+/","/",$location."/".$e);
            }
		}
	}
}
$response = array("data"=>$display);
$json = json_encode($response);
header('Content-Type: application/json');
echo($json);
