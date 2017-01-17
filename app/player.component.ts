import { Component, Input, Output, EventEmitter} from "@angular/core";
import { File } from "./File";

@Component({
  selector: "player",
  template: `
<div id="player" [class.hidden]="playedSong==null">
    <div class="navigation">
        <div (click)="pauseplay()" class="pauseplay"><i class="fa" [class.fa-play]="!isPlaying" [class.fa-pause]="isPlaying"></i></div>
    </div>
    <div (click)="seekTo($event)" class="lines">
        <div class="line timeline"><div class="cursor"></div></div>
        <div class="line placeholderline"></div>
    </div>
    <div class="time"></div>
</div>
    `
})
export class PlayerComponent {
    @Input() playedSong: string;
    isPlaying: boolean = false;
    audioPlayer: HTMLAudioElement;
    playPercent: number = 0;
    loadPercent: number = 0;
    pid: number;
    @Output() onNextSong = new EventEmitter<any>();
    @Output() onPrevSong = new EventEmitter<any>();

    nextSong() {
        this.onNextSong.emit(null);
    }
    prevSong() {
        this.onPrevSong.emit(null);
    }

    seekTo(evt: any) {
        let lines: HTMLElement = document.querySelector("#player .lines") as HTMLElement;
        let p: number = (evt.pageX - lines.offsetLeft) / lines.offsetWidth;
        let song  = this.audioPlayer;
        song.currentTime = song.duration*p;
    }

    pauseplay() {
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
            this.audioPlayer.play();
        } else {
            this.audioPlayer.pause();
        }
    }
    startSong() {
        if (typeof(this.audioPlayer) !== "undefined") {
            this.audioPlayer.pause(),
            clearInterval(this.pid);
        }
        this.isPlaying = true;
        let t: File = new File(this.playedSong);
        document.getElementsByTagName("title")[0].innerHTML = t.name;
        if (typeof(this.audioPlayer) === "undefined") {
            this.audioPlayer = new Audio(this.playedSong);
        } else {
            this.audioPlayer.src = this.playedSong;
        }
        this.audioPlayer.play();

        this.pid = window.setInterval(() =>
            this.timeUpdate(this),
        1000);
    }
    timeUpdate(that:any) {
        let song = that.audioPlayer;
        if (song.buffered.length !== 0) {
            let playPercent = 100 * (song.currentTime / song.duration);
            let loadPercent = 100 * (song.buffered.end(0) / song.duration);
            let timeline = document.querySelector("#player .timeline") as HTMLElement;
            timeline.style.width = playPercent + "%";
            if (playPercent >= 100) {
                this.nextSong();
            }
            let time = document.querySelector("#player .time") as HTMLElement;
            time.innerHTML = this.toTimeString(song.currentTime); // + " / " + this.toTimeString(song.duration);
        }
    }
    toTimeString(t: number): string {

        t = Math.floor(t);
        let m = Math.floor(t/60);
        let s = t % 60;
        let ms: string = "";
        let ss: string = "";

        if(m < 10 && m != 0) {
            ms = "0" + m.toString();
        } else {
            ms = m.toString();
        }
        if(s < 10) {
            ss = "0" + s.toString();
        } else {
            ss = s.toString();
        }
        return ms + ":" + ss;
    }
}
