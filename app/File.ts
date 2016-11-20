export class File {
    artist: string;
    album: string;
    name: string;
    src: string;
    type: string;
    icon: string;
    class: string;

    constructor(str: string, path?: string) {

        if(str.match(/\.mp3$/)) {
            this.type = "song";
        } else {
            this.type = "directory";
        }

        if(this.type == "song") {
            this.artist = str.replace(/.*\/([^\/]*)\/([^\/]*)\/.*$/, "$1");
            this.album = str.replace(/.*\/([^\/]*)\/.*$/, "$1");
            this.name = str.replace(/.*\/(.*)$/, "$1").replace(/\.\w+$/, "");
            this.icon = "glyphicon-music";
        } else {
            this.artist = "";
            this.album = "";
            this.name = str.replace(/.*\/(.*)$/, "$1/").replace(/\.\w+$/, "");
            if(path != null && path.length > str.length) {
                this.icon = "dirIcon glyphicon-level-up";
            } else {
                this.icon = "dirIcon glyphicon-folder-close";
            }
        }
        this.class = "glyphicon fileIcon " + this.icon;
        this.src = str;
    }
}
