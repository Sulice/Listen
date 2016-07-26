import { Component, EventEmitter, Output } 	from '@angular/core';
import { SearchService } 					from './search.service';
import { Track } 							from './Track';
import { Observable }        				from 'rxjs/Observable';

@Component({
	selector: 'search-bar',
	template: `
		<div class="search-bar">
			<div class="input-group">
				<div class="input-group-addon"><i class="glyphicon glyphicon-music"></i></div>
				<input autocomplete="off" placeholder="search for songs" (keyup)="search(searchInput.value)" type="text" class="form-control" #searchInput/>
			</div>
		</div>
	`
})
export class SearchBarComponent { 
	@Output() onFoundTracks = new EventEmitter<Track[]>();
	
	constructor(public searchService: SearchService) {}

	search(s: string) {
		if(s.length < 1) {
			return;
		}
		this.searchService.search(s).subscribe(
			r => this.onFoundTracks.emit(r),
			error => console.log("e:"+error)
		);
	}
}
