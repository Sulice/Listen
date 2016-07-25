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
		<player></player>
	`,
	directives: [SearchBarComponent, ResultsComponent, PlayerComponent],
	providers: [SearchService]
})
export class AppComponent { 
	tracks: Track[] = [];
	//playedTrack: Track;
	@ViewChild(PlayerComponent) player: PlayerComponent;

	onFoundTracks(t: Track[]) {
		this.tracks = t;
	}

	onPlayTrack(t: Track) {
		this.player.playedTrack = t;
		this.player.startSong();
	}

}
