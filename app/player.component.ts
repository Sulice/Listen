import { Component, Input } from '@angular/core';
import { Track } 				from './Track';

@Component({
  selector: 'player',
  template: `
	<div id="player">
		<div class="timeline"></div>
		<div class="loadline"></div>
		<div class="navigation">
			<div (click)="previousSong()" class="prev"><i class="fa fa-step-backward"></i></div>
			<div (click)="pauseplay()" class="pauseplay"><i class="fa fa-play"></i></div>
			<div (click)="nextSong()" class="next"><i class="fa fa-step-forward"></i></div>
		</div>
	</div>
	`,
  styleUrls: ['app/player.component.css']
})
export class PlayerComponent {
	@Input() playedTrack: Track;
	isPlaying: boolean = false;
	audioPlayer: HTMLAudioElement;

	pauseplay() {
		this.isPlaying = !this.isPlaying;
		if(this.isPlaying) {
			this.audioPlayer.play();
		} else {
			this.audioPlayer.pause();
		}
	}
	startSong() {
		if(typeof(this.audioPlayer) != "undefined") {
			this.audioPlayer.pause();
		}
		console.log('starting song:'+this.playedTrack);
		this.isPlaying = true;
		this.audioPlayer = new Audio(this.playedTrack.src);
		this.audioPlayer.play();
	}

}
