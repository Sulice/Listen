import { Component, Input, Output, EventEmitter } from "@angular/core";

import { File } from "./File";

@Component({
    selector: "player",
    template: `
    <div class="informations" *ngIf="file">
        <span class="title">{{ file?.name }}</span>
        <span class="stats">{{ numberOfTracks }} tracks ({{ playlistDuration }})</span>
    </div>
    <div class="controls">
        <div class="navigation">
            <div (click)="prevSong()" class="prevsong"><i class="fa fa-step-backward"></i></div>
            <div (click)="pauseplay()" class="pauseplay"><i class="fa" [class.fa-play]="!isPlaying" [class.fa-pause]="isPlaying"></i></div>
            <div (click)="nextSong()" class="nextsong"><i class="fa fa-step-forward"></i></div>
            <div (click)="toggleRepeat()" [class.on]="isRepeating" class="repeat"><i class="fa fa-undo"></i></div>
        </div>
        <div (click)="seekTo($event)" id="lines">
            <div id="timeline"><div class="cursor"></div></div>
            <div class="placeholderline"></div>
        </div>
        <div id="time"></div>
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
    active: boolean = false;
    @Output() onNextSong = new EventEmitter<null>();
    @Output() onPrevSong = new EventEmitter<null>();
    @Output() onRepeatSong = new EventEmitter<null>();
    isRepeating: boolean = false;
    file: File;
    @Input() numberOfTracks: number;
    @Input() playlistDuration: string;

    toggleRepeat() {
        this.isRepeating = !this.isRepeating;
    }

    nextSong() {
        this.onNextSong.emit(null);
    }

    prevSong() {
        this.onPrevSong.emit(null);
    }

    seekTo(evt: MouseEvent) {
        let lines: HTMLElement = document.getElementById("lines") as HTMLElement;
        if(lines) {
            let p: number = (evt.pageX - lines.getBoundingClientRect().left) / lines.offsetWidth;
            let song  = this.audioPlayer;
            song.currentTime = song.duration * p;
        }
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
        } else {
            this.active = true;
        }
        this.isPlaying = true;
        let t: File = new File(this.playedSong);
        this.file = t;
        document.getElementsByTagName("title")[0].innerHTML = t.name;
        if (typeof(this.audioPlayer) === "undefined") {
            this.audioPlayer = new Audio(this.playedSong);
        } else {
            this.audioPlayer.src = this.playedSong;
        }
        this.audioPlayer.play();

        this.pid = window.setInterval(() =>
            this.timeUpdate(),
        1000);
    }
    timeUpdate() {
        let song = this.audioPlayer;
        if (song.buffered.length !== 0) {
            let playPercent = 100 * (song.currentTime / song.duration);
            let loadPercent = 100 * (song.buffered.end(0) / song.duration);
            let timeline = document.getElementById("timeline") as HTMLElement;
            if(timeline) {
                timeline.style.width = playPercent + "%";
            }
            if (playPercent >= 100) {
                if (this.isRepeating) {
                    this.startSong();
                } else {
                    this.nextSong();
                }
            }
            let time = document.getElementById("time") as HTMLElement;
            if(time) {
                time.innerHTML = this.toTimeString(song.currentTime);
            }
        }
    }
    toTimeString(t: number): string {

        t = Math.floor(t);
        let m = Math.floor(t / 60);
        let s = t % 60;
        let ms: string = "";
        let ss: string = "";

        if (m < 10 && m !== 0) {
            ms = "0" + m.toString();
        } else {
            ms = m.toString();
        }
        if (s < 10) {
            ss = "0" + s.toString();
        } else {
            ss = s.toString();
        }
        return ms + ":" + ss;
    }
}
