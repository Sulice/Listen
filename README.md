Listen
======

# Project in alpha stage. A lot is going to change.

### What is Listen ?
Listen is a simple-as-pie bit of code enabling listening music from your server.
This was an old project of mine that I'm trying to improve now.
It's now a playing ground for sharpening my skills in angular2.

You can test it right now [here](http://nibou.eu/listen) !

### Installation

Listen will search for you music in the directory specified in parameters.json.  
You'll have to specify also the root url to replace the path of the music directory.  
npm is needed to build the project.
```
npm i
npm run build
```

You then need to create a parameters.json file in the php/ directory and fill it like this :
```
{
    "root_url": "http://root_url_of_the_music_directory/",
    "music_dir": "/path/to/the/music/directory/"
}
```

### Requirements
_The requirements are probably lower but I only tested it with those._
- PHP 7+
- GNU Coreutils
- NPM 3+

### TODO
- escape # in url (change separator ?)
- add playlist total time (where ?)
- animation on name to act as a spinner
- add keyboard shortcut to center view on current song
- add current song index in url
- replay button at the end of playlist
- playlists ?
- infinite scrolling for search, browse and random
- remove php and coreutils by doing everything with node ?
- install should be easier
- clean up the repo
- Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause(). [when rapidly doing next/previous]
