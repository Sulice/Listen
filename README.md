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
- PHP 7+
- GNU Coreutils
- NPM 3+

### TODO
- floating parent directory when browsing
- handle before and next on the first and last song
- infinite scrolling for search, browse and random
- playlists ?
- Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause(). [when rapidly doing next/previous]
- add a "directory does not exist" error when starting browsing in a unexistant directory
- add current song index in url
- replay button at the end of playlist
- update webpack and simplify it
- reduce requirements : 
    - test php5.6 in a docker container
    - test busybox in a docker container
    - test an older version of npm in a docker container
