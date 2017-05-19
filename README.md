Listen
======
_Simple-as-pie bit of code enabling streaming music from your server._

# Project in alpha stage. A lot is going to change.

### Goals
- Easy to install.
- No db : it reads your directory structure.
- Minimal & fully responsive UI

You can test it [here](http://nibou.eu/listen) right now !  
The project only supports mp3 files.

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
_(can be lower : only tested with those)_
- PHP 7+ (5.3+ is sure)
- NPM 3+

### TODO
- infinite scrolling for search, browse and random
- return to top button and keyboard shortcut
- handle before and next on the first and last song
- playlists ?
- Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause(). [when rapidly doing next/previous]
- add a "directory does not exist" error when starting browsing in a unexistant directory
- add indexedDB to cache searches, and for playlists
- add current song index in url
- replay button at the end of playlist
- update webpack and simplify it
- remove webpack dependency if possible ? Simplify build process ?
- reduce requirements : 
    - test php5.6 in a docker container
    - test an older version of npm in a docker container
- go to next song in case of : "Media resource https://public.niels.fr/Music///METAL/Progressif/Opeth/2003%20-%20Damnation/06%20To%20Rid%20The%20Disease.mp3 could not be decoded."
- allow usage of yarn
