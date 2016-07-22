<?php

$dir = "DATA";
$s = $_GET['s'];

if(preg_match("/^\s*$/",$s)==1) {
	exit;
}

$s = preg_split("/\ /",$s);
$command = '/usr/bin/find -H '.$dir.' -type f -regextype posix-extended -iregex ".*'.$s[0].'.*"';
for($i=1;$i<count($s);$i++) {
	$command .= ' | grep -i "'.$s[$i].'"';
}
exec($command.' | head -n100', $output);
sort($output, SORT_NATURAL);
for($i=0;$i<count($output);$i++) {
	$output[$i] = preg_replace("/\/srv\/http/","http://www.nibou.eu",$output[$i]);
}

header('Content-Type: text/json; charset=UTF-8');
echo(json_encode($output));

?>
