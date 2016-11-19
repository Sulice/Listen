export class File {
    artist: string;
    album: string;
    name: string;
    src: string;
    type: string;
    url: string;

    constructor(str: string) {

        if(str.match(/\.mp3$/)) {
            this.type = "song";
        } else {
            this.type = "directory";
        }

        if(this.type == "song") {
            this.artist = str.replace(/.*\/([^\/]*)\/([^\/]*)\/.*$/, "$1");
            this.album = str.replace(/.*\/([^\/]*)\/.*$/, "$1");
        } else {
            this.artist = "";
            this.album = "";
        }
        this.name = str.replace(/.*\/(.*)$/, "$1").replace(/\.\w+$/, "");
        this.src = str;
    }
}
