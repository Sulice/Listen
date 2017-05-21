import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

import { File } from "./File";
import { PlaylistService } from "./playlist.service";

@Component({
    selector: "player",
    templateUrl: "player.component.html"
})
export class PlayerComponent implements OnInit {
    @Input() playedSong: string;
    isPlaying: boolean;
    audioPlayer: HTMLAudioElement;
    playPercent: number;
    loadPercent: number;
    pid: number;
    active: boolean;
    @Output() onNextSong: EventEmitter<null>;
    @Output() onPrevSong: EventEmitter<null>;
    @Output() onRepeatSong: EventEmitter<null>;
    isRepeating: boolean;
    file: File;
    @Input() numberOfTracks: number;
    @Input() playlistDuration: string;
    displayMoreControls: boolean;
    selectedPlaylist: string;

    constructor(
        private playlistService: PlaylistService,
    ) {
        this.isPlaying = false;
        this.playPercent = 0;
        this.loadPercent = 0;
        this.active = false;
        this.isRepeating = false;
        this.onNextSong = new EventEmitter<null>();
        this.onPrevSong = new EventEmitter<null>();
        this.onRepeatSong = new EventEmitter<null>();
        this.displayMoreControls = false;
    }

    ngOnInit() {
        this.selectedPlaylist = Object.keys(this.playlistService.playlists)[0];
        console.log(this.selectedPlaylist);
    }

    showMoreControls() {
        this.displayMoreControls = true;
    }

    hideMoreControls() {
        this.displayMoreControls = false;
    }

    isPlaylists(): boolean {
        return Object.keys(this.playlistService.playlists).length > 0;
    }

    getPlaylists(): string[] {
        return Object.keys(this.playlistService.playlists);
    }

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
        if (typeof(this.audioPlayer) !== "undefined") {
            let lines: HTMLElement = document.getElementById("lines") as HTMLElement;
            if (lines) {
                let p: number = (evt.pageX - lines.getBoundingClientRect().left) / lines.offsetWidth;
                let song  = this.audioPlayer;
                song.currentTime = song.duration * p;
            }
        }
    }

    pauseplay() {
        if (typeof(this.audioPlayer) !== "undefined") {
            this.isPlaying = !this.isPlaying;
            if (this.isPlaying) {
                this.audioPlayer.play();
            } else {
                this.audioPlayer.pause();
            }
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
            if (timeline) {
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
            if (time) {
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
