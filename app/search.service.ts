import { Injectable } 		from '@angular/core';
import { Track } 			from './Track';

@Injectable()
export class SearchService {
	public waiting: boolean = false;
	
	search(s: String): Track[] {
		//if(currentSearch != null) {
		//	currentSearch.abort();
		//	currentSearch = null;
		//}
		//$('#results').html('<i id="loading" class="fa fa-cog fa-spin"></i>');


		//currentSearch = $.get('search.php?s='+s, function(data) {
		//	$('#results').html('');
		//	for(let i=0;i<data.length;i++) {
		//		$('#results').append(buildTrack(data[i]));
		//	}
		//	$('#next').addClass('not-active');
		//	$('#prev').addClass('not-active');
		//});
		//
		return [new Track("artist","album","title","src")];
	}

}
