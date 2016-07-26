import { Component, Input, Output, EventEmitter} 			from '@angular/core';
import { Track } 											from './Track';
import { SearchService } 									from './search.service';

@Component({
	selector: 'results',
	template: `
		<div class="results">
			<table class="table table-hover table-bordered">
				<tr 
					*ngFor="let track of tracks" 
					[class.active]="currentTrack == track.src" 
					class="list-group-item" 
					(click)="loadSong(track.src)" 
					[attr.data-src]="track.src"
				>
					<h6>{{track.artist}} - {{track.album}}</h6>
					<h5>{{track.title}}</h5>
				</tr>
			</table>
		</div>
	`
})
export class ResultsComponent { 
	@Input() tracks: Track[] = [];
	@Output() onPlayTrack = new EventEmitter<string>();
	currentTrack: string;
	// TODO waiting

	constructor(public searchService: SearchService) {}

	loadSong(src: string) {
		this.currentTrack = src;
		console.log(this.currentTrack);
		this.onPlayTrack.emit(this.currentTrack);
	}

}
