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

### Requirements
_The requirements are probably lower but I only tested it with those._
- PHP 7+
- GNU Coreutils
- NPM 3+

### TODO
- add current song index in url
- rework design
- tslint
- review compilation chain
- add random function
- add dynamic search placeholder
- net::ERR_CONTENT_LENGTH_MISMATCH [is it a nginx issue ?]
- Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause(). [when rapidly doing next/previous]
- playlists ?
- add keyboard shortcut to center view on current song
- replay button at the end of list
