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

    constructor(str: string, duration?:number, path?: string) {

        if(str.match(/\.mp3$/)) {
            this.type = "song";
        } else {
            this.type = "directory";
        }

        if(this.type == "song") {
            this.artist = str.replace(/.*\/([^\/]*)\/([^\/]*)\/.*$/, "$1");
            this.album = str.replace(/.*\/([^\/]*)\/.*$/, "$1");
            this.name = str.replace(/.*\/(.*)$/, "$1").replace(/\.\w+$/, "");
            this.icon = "fa-play";
            if(duration) {
                this.durationInSeconds = duration;
                this.duration = this.formatTime(duration);
            }
        } else {
            this.artist = "";
            this.album = "";
            this.name = str.replace(/.*\/(.*)$/, "$1"); //.replace(/\.\w+$/, "");
            if(this.name === "") {
                this.name = "/";
            }
            if(path != null && path.length >= str.length) {
                //this.icon = "dirIcon fa-level-up";
                this.icon = "dirIcon fa-reply";
            } else {
                this.icon = "dirIcon fa-folder-o";
            }
        }
        this.class = "fa fileIcon " + this.icon;
        this.src = str;
    }

    formatTime(duration:number): string {
        let hours:number = Math.floor(duration / 3600);
        let minutes:number = Math.floor((duration - hours*3600) / 60);
        let seconds:number = Math.floor(duration - hours*3600 - minutes*60);
        let s:string = String(seconds);
        if(seconds < 10) {
            s = "0"+s;
        }

        if(hours === 0) {
            return minutes + ":" + s;
        }
        
        let m:string = String(minutes);
        if(minutes < 10) {
            m = "0"+m;
        }
        return hours + ":" + m + ":" + s;
    }
}
