import { Component, EventEmitter, Output } 	from '@angular/core';
import { SearchService } 					from './search.service';
import { Track } 							from './Track';
import { Observable }        				from 'rxjs/Observable';

@Component({
	selector: 'search-bar',
	template: `
		<div id="search-bar">
			<input autocomplete="off" placeholder="search" (keyup)="search(searchInput.value)" type="text" class="search" #searchInput/>
			<div class="black" (click)="search(searchInput.value)" class="submit"><i class="fa fa-search"></i></div>
		</div>
	`,
	styleUrls: ['app/search-bar.component.css'],
})
export class SearchBarComponent { 
	@Output() onFoundTracks = new EventEmitter<Track[]>();
	
	constructor(public searchService: SearchService) {}

	search(s: string) {
		this.searchService.search(s).subscribe(
			r => this.onFoundTracks.emit(r),
			error => console.log("e:"+error)
		);
	}
}
