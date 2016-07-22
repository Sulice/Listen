import { Component, Input} 			from '@angular/core';
import { Track } 				from './Track';
import { SearchService } 		from './search.service';

@Component({
	selector: 'results',
	template: `
		<div id="results">
			<div *ngFor="let track of tracks" class="track" (onclick)="loadSong(track.src)">
				<div class="artist">{{track.artist}} - {{track.album}} </div>
				<div class="title">{{track.title}}</div>
			</div>
			<i *ngIf="searchService.waiting" id="loading" class="fa fa-cog fa-spin"></i>
		</div>
	`,
	styleUrls: ['app/results.component.css']
})
export class ResultsComponent { 
	@Input() public tracks: Track[] = [];

	constructor(public searchService: SearchService) {}


}
