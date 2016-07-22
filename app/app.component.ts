import { Component } 			from '@angular/core';
import { SearchBarComponent } 	from './search-bar.component';
import { ResultsComponent } 	from './results.component';
import { PlayerComponent } 		from './player.component';
import { Track } 				from './Track';
import { SearchService } 		from './search.service';

@Component({
	selector: 'listen-music-player',
	template: `
		<search-bar (onFoundTracks)='onFoundTracks($event)'></search-bar>
		<results [tracks]="tracks"></results>
		<player></player>
	`,
	directives: [SearchBarComponent, ResultsComponent, PlayerComponent],
	providers: [SearchService]
})
export class AppComponent { 
	public tracks: Track[] = [];

	onFoundTracks(t: Track[]) {
		this.tracks = t;
	}

}
