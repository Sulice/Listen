<?php

function endsWith($haystack, $needle) {
    $length = strlen($needle);
    if ($length == 0) {
        return true;
    }
    return (substr($haystack, -$length) === $needle);
}

require_once('mp3.php');

$p = json_decode(file_get_contents("parameters.json"), true);

$dir = $p['music_dir'];
$q = urldecode($_GET['q']);

// prevent going back in dir tree with relative pathing
$q = preg_replace('/\/\.\.\//',"",$q);

if($q[0] != "/") {
    $q = "/".$q;
}

$location = $dir.$q;
$entries = scandir($location);
$results = [];

// add parent dir as first entry (or empty string if we are at root)
if($q == "/") {
    $parent = "";
} else {
    $e = preg_replace("/\/[^\/]+\/?$/","",$s);
    if($e == "") {
        $e = "/";
    }
    $parent = str_replace($dir,"/",$e);
}

natcasesort($entries);
$entries = array_values($entries);

foreach($entries as $e) {
	if(pathinfo($e, PATHINFO_EXTENSION) == "mp3" || is_dir($location."/".$e)) {
		if($e != "." && $e != "..") {
            if(pathinfo($e, PATHINFO_EXTENSION) == "mp3") {
                $e = preg_replace("/\/+/","/",$location."/".$e);
                $mp3file = new fastMP3File($e);
                $results[] = array(
                    str_replace($dir,$p['root_url'],$e),
                    $mp3file->getDuration()
                );
            } else {
                $e = preg_replace("/\/+/","/",$location."/".$e);
                $results[] = array(
                    str_replace($dir,"/",$e)
                );
            }
		}
	}
}

//natcasesort($results);
//$results = array_values($results);

// output result as json
$response = json_encode(array("data"=>$results, "query"=>$q, "parent"=>$parent));
header('Content-Type: text/json; charset=UTF-8');
echo($response);
?>
