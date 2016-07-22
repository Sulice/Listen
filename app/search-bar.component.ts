import { Component, EventEmitter, Output } from '@angular/core';
import { SearchService } 		from './search.service';
import { Track } 				from './Track';

@Component({
	selector: 'search-bar',
	template: `
		<div id="search-bar">
			<div class="black" (click)="random()" class="random"><i class="fa fa-random"></i></div>
			<input autocomplete="off" placeholder="search" type="text" class="search" #searchInput/>
			<div class="black" (click)="search(searchInput.value)" class="submit"><i class="fa fa-search"></i></div>
		</div>
	`,
	styleUrls: ['app/search-bar.component.css'],
})
export class SearchBarComponent { 
	@Output() onFoundTracks = new EventEmitter<Track[]>();
	
	constructor(public searchService: SearchService) {}

	search(s: String) {
		let plop = this.searchService.search(s);
		this.onFoundTracks.emit(plop);
	}
}
