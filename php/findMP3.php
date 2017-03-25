<?php

function findMP3($dir) {
    // some flags to filter . and .. and follow symlinks
    // the iterator is faster when following symlinks
    $flags = \FilesystemIterator::SKIP_DOTS | \FilesystemIterator::FOLLOW_SYMLINKS | \FilesystemIterator::CURRENT_AS_PATHNAME;

    // create a simple recursive directory iterator
    $iterator = new \RecursiveDirectoryIterator($dir, $flags);
    $iterator = new \RecursiveIteratorIterator($iterator, \RecursiveIteratorIterator::SELF_FIRST);

    $output = [];
    while($iterator->valid()) {

        $name = $iterator->current();

        if(is_dir($name) || preg_match('/\.mp3$/i', $name)) {
            $output[] = $name;
        }
        $iterator->next();
    }
    return $output;
}
