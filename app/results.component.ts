import { Component, Input, Output, EventEmitter} 			from '@angular/core';
import { Track } 											from './Track';
import { SearchService } 									from './search.service';

@Component({
	selector: 'results',
	template: `
		<div id="results">
			<div *ngFor="let track of tracks" [class.playing]="currentTrack == track.src" class="track" (click)="loadSong(track.src)" [attr.data-src]="track.src">
				<div class="artist">{{track.artist}} - {{track.album}} </div>
				<div class="title">{{track.title}}</div>
			</div>
			<i *ngIf="searchService.waiting" id="loading" class="fa fa-cog fa-spin"></i>
		</div>
	`,
	styleUrls: ['app/results.component.css']
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
