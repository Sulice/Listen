<?php

$p = json_decode(file_get_contents("parameters.json"), true);

$dir = $p['music_dir'];
$s = urldecode($_GET['s']);

// prevent going back in dir tree
$s = preg_replace('/\/\.\.\//',"",$s);
if($s[0] != "/") {
    $s = "/".$s;
}

$location = $dir.$s;
$entries = scandir($location);
$display = [];
$display[] = $s;
foreach($entries as $e) {
	if(pathinfo($e, PATHINFO_EXTENSION) == "mp3" || is_dir($location."/".$e)) {
		if($e != ".") {
            if(pathinfo($e, PATHINFO_EXTENSION) == "mp3") {
                $e = preg_replace("/\/+/","/",$location."/".$e);
                $display[] = str_replace($dir,$p['root_url'],$e);
            } else {
                if($e == "..") {
                    if($s != "" && $s != "/") {
                        $e = preg_replace("/\/[\w\s]+\/?$/","",$s);
                        if($e == "") {
                            $e = "/";
                        }
                        $display[] = str_replace($dir,"/",$e);
                    }
                } else {
                    $e = preg_replace("/\/+/","/",$location."/".$e);
                    $display[] = str_replace($dir,"/",$e);
                }
            }
		}
	}
}
$response = array("data"=>$display);
$json = json_encode($response);
header('Content-Type: application/json');
echo($json);
