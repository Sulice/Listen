import { Component, Input, Output, EventEmitter} from "@angular/core";
import { Track } from "./Track";

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
    audioPlayers: HTMLAudioElement[] = [];
    idPlaying: number = 0;
    playPercent: number = 0;
    loadPercent: number = 0;
    pid: number;
    @Output() onNextSong = new EventEmitter<any>();
    @Output() onPrevSong = new EventEmitter<any>();

    nextSong() {
        console.log(Date.now());
        this.onNextSong.emit(null);
    }

    prevSong() {
        this.onPrevSong.emit(null);
    }

    pauseplay() {
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
            this.audioPlayers[this.idPlaying].play();
        } else {
            this.audioPlayers[this.idPlaying].pause();
        }
    }
    startSong() {
        if (typeof(this.audioPlayers[this.idPlaying]) != "undefined") {
            this.audioPlayers[this.idPlaying].pause(),
            clearInterval(this.pid);
        }

        let t: Track = new Track(this.playedTrack);
        document.getElementsByTagName("title")[0].innerHTML = t.title;
        
        this.isPlaying = true;
        this.idPlaying = this.nextId();

        if (typeof(this.audioPlayers[this.idPlaying]) == "undefined") {
            this.audioPlayers[this.idPlaying] = new Audio(this.playedTrack);
        } else {
            console.log(this.audioPlayers[this.idPlaying].src,this.qualifyURL(this.playedTrack));
            if (this.audioPlayers[this.idPlaying].src != this.qualifyURL(this.playedTrack)) {
                this.audioPlayers[this.idPlaying].src = this.playedTrack;
            } else {
                console.log('playing preloaded');
            }
        }
        
        //this.audioPlayers[this.idPlaying].addEventListener('canplaythrough', () =>
            this.audioPlayers[this.idPlaying].play();
        //false);


        this.pid = setInterval(() =>
            this.timelineUpdate(this),
        500);

    }
    timelineUpdate(that) {
        let song = that.audioPlayers[that.idPlaying];
        if (song.buffered.length !== 0) {
            let playPercent = 100 * (song.currentTime / song.duration);
            let loadPercent = 100 * (song.buffered.end(0) / song.duration);
            // preload next song
            if (loadPercent >= 100) {
                this.preloadSong();
            }
            let timeline = document.querySelector("#player .timeline") as HTMLElement;
            timeline.style.width = playPercent + "%";
            let loadline = document.querySelector("#player .loadline") as HTMLElement;
            loadline.style.width = loadPercent + "%";
            if (playPercent >= 100) {
                this.nextSong();
            }
        }
    }
    preloadSong() {
        let playing = document.querySelector(".active") as HTMLElement;
        let next = playing.nextElementSibling as HTMLElement;
        if (next != null) {
            let src = next.dataset["src"];
            if (typeof(this.audioPlayers[this.nextId()]) != "undefined" && this.audioPlayers[this.nextId()].src == this.qualifyURL(src)) {
                console.log('already preloaded');
            } else {
                this.audioPlayers[this.nextId()] = new Audio(src);
                console.log('preload created !');
            } 
            this.audioPlayers[this.nextId()].addEventListener('canplaythrough', () => {
                this.audioPlayers[this.nextId()].play();
                setTimeout(() => this.audioPlayers[this.nextId()].pause(), 10);
            }, false);
        }
    }
    // simple hack found on SO to transform a relative url into an absolute one.
    qualifyURL(url: string): string {
        var a = document.createElement('a');
        a.href = url;
        return a.href;
    }
    nextId(): number {
        return (this.idPlaying+1)%2;
    }
}
