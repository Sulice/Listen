Listen
======
_Simple-as-pie bit of code enabling streaming music from your server._

# Project in alpha stage. A lot is going to change.

### Goals
- Easy to install.
- Mobile first.
- No db : it reads your directory structure.

You can test it [here](http://nibou.eu/listen) right now !

### Installation

To build the project, all you have to do is :
```
npm i
npm run build
```

Listen will search for your music in the directory specified in parameters.json.  
You'll have to specify also the root url to replace the path of the music directory.  
Create a parameters.json file in the php/ directory and fill it like this :
```
{
    "root_url": "http://root_url_of_the_music_directory/",
    "music_dir": "/path/to/the/music/directory/"
}
```

### Requirements
- PHP 5.6+
- GNU Coreutils
- NPM 3+

### TODO
- handle before and next on the first and last song
- playlists ?
- add a "directory does not exist" error when browsing
- add playlist total time (where ?)
- some kind of spinner when searching : maybe reuse the starting animation
- add keyboard shortcut to center view on current song
- add current song index in url
- replay button at the end of playlist
- infinite scrolling for search, browse and random
- remove coreutils by doing everything in php
- clean up the repo
- Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause(). [when rapidly doing next/previous]
