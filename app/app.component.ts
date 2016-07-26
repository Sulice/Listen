import { Component, ViewChild } 			from '@angular/core';
import { SearchBarComponent } 				from './search-bar.component';
import { ResultsComponent } 				from './results.component';
import { PlayerComponent } 					from './player.component';
import { Track } 							from './Track';
import { SearchService } 					from './search.service';

@Component({
	selector: 'listen-music-player',
	template: `
		<search-bar (onFoundTracks)='onFoundTracks($event)'></search-bar>
		<results (onPlayTrack)='onPlayTrack($event)' [tracks]="tracks"></results>
		<player (onPrevSong)='onPrevSong()' (onNextSong)='onNextSong()'></player>
	`,
	directives: [SearchBarComponent, ResultsComponent, PlayerComponent],
	providers: [SearchService]
})
export class AppComponent { 
	tracks: Track[] = [];
	@ViewChild(PlayerComponent) player: PlayerComponent;
	@ViewChild(ResultsComponent) results: ResultsComponent;

	onNextSong() {
		let playing = document.querySelector('.playing') as HTMLElement;
		let next = playing.nextElementSibling as HTMLElement;
		if(next != null) {
			this.results.loadSong(next.dataset['src']);
		}
	}
	onPrevSong() {
		let playing = document.querySelector('.playing') as HTMLElement;
		let prev = playing.previousElementSibling as HTMLElement;
		if(prev != null) {
			this.results.loadSong(prev.dataset['src']);
		}
	}

	onFoundTracks(t: Track[]) {
		this.tracks = t;
	}

	onPlayTrack(src: string) {
		this.player.playedTrack = src;
		this.player.startSong();
	}

}
