export class File {
    artist: string;
    album: string;
    name: string;
    src: string;
    type: string;
    icon: string;
    class: string;
    duration: string;
    durationInSeconds: number;

    constructor(id: string, duration?: number, path?: string) {

        this.artist = "";
        this.album = "";
        this.name = "";
        this.icon = "";
        this.src = "";
        this.duration = "";
        this.durationInSeconds = 0;

        this.type = this.getFileType(id);

        switch (this.type) {
            case "song":
                this.extractSongInfos(id);
                this.icon = "fa-play";
                if (duration) {
                    this.durationInSeconds = duration;
                    this.duration = this.formatTime(duration);
                }
                break;
            case "directory":
                this.name = id.replace(/.*\/(.*)$/, "$1");
                if (this.name === "") {
                    this.name = "/";
                }
                if (path != null && path.length >= id.length) {
                    this.icon = "dirIcon fa-reply";
                } else {
                    this.icon = "dirIcon fa-folder";
                }
                this.src = id;
                break;
            case "playlist":
                this.name = id;
                this.src = id;
                this.icon = "fa-list";
                break;
            default:
        }

        this.class = "fa fileIcon " + this.icon;
    }

    extractSongInfos(id: string) {
        this.artist = id.replace(/.*\/([^\/]*)\/([^\/]*)\/.*$/, "$1");
        this.album = id.replace(/.*\/([^\/]*)\/.*$/, "$1");
        this.name = id.replace(/.*\/(.*)$/, "$1").replace(/\.\w+$/, "");
        this.src = id;
    }

    getFileType(id: string): string {
        if (id.match(/^\//) || id.match(/^http/)) {
            if (id.match(/\.mp3$/)) {
                return "song";
            } else {
                return "directory";
            }
        }
        return "playlist";
    }

    formatTime(duration: number): string {
        let hours: number = Math.floor(duration / 3600);
        let minutes: number = Math.floor((duration - hours * 3600) / 60);
        let seconds: number = Math.floor(duration - hours * 3600 - minutes * 60);
        let s: string = String(seconds);
        if (seconds < 10) {
            s = "0" + s;
        }

        if (hours === 0) {
            return minutes + ":" + s;
        }

        let m: string = String(minutes);
        if (minutes < 10) {
            m = "0" + m;
        }
        return hours + ":" + m + ":" + s;
    }
}
