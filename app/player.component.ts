import { Component, Input, Output, EventEmitter}    from "@angular/core";
import { Track }                                    from "./Track";

@Component({
  selector: "player",
  template: `
      <div id="player">
          <div class="timeline"></div>
          <div class="loadline"></div>
          <div [class.hidden]="playedTrack==null" class="navigation">
              <div (click)="prevSong()" class="prev"><i class="glyphicon glyphicon-step-backward"></i></div>
              <div (click)="pauseplay()" class="pauseplay"><i class="glyphicon" [class.glyphicon-play]="!isPlaying" [class.glyphicon-pause]="isPlaying"></i></div>
              <div (click)="nextSong()" class="next"><i class="glyphicon glyphicon-step-forward"></i></div>
          </div>
      </div>
    `,
  styleUrls: ["app/player.component.css"]
})
export class PlayerComponent {
    @Input() playedTrack: string;
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
        let t: Track = new Track(this.playedTrack);
        document.getElementsByTagName("title")[0].innerHTML = t.title;
        if (typeof(this.audioPlayer) == "undefined") {
            this.audioPlayer = new Audio(this.playedTrack);
        } else {
            this.audioPlayer.src = this.playedTrack;
        }
        this.audioPlayer.play();

        this.pid = setInterval(() => 
            this.timelineUpdate(this), 
        1000);
    }
    timelineUpdate(that) {
        let song = that.audioPlayer;
        if (song.buffered.length !== 0) {
            let playPercent = 100 * (song.currentTime / song.duration);
            let loadPercent = 100 * (song.buffered.end(0) / song.duration);
            let timeline = document.querySelector("#player .timeline") as HTMLElement;
            timeline.style.width = playPercent + "%";
            let loadline = document.querySelector("#player .loadline") as HTMLElement;
            loadline.style.width = loadPercent + "%";
            if (playPercent >= 100) {
                this.nextSong();
            }
        }
    }

}
