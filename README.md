Listen
======
_Simple-as-pie bit of code enabling streaming music from your server._

# Project is being fuly reworked. Not working for now

### Goals
- Easy to install.
- No db : it reads your directory structure.
- Minimal & fully responsive UI

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
    "music_dir": "/path/to/the/music/directory/"
}
```

### Requirements
- PHP 7+
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
