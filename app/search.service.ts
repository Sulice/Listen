import { Injectable } 		from '@angular/core';
import { Track } 			from './Track';
import { Http, Response } 	from '@angular/http';

// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/debounceTime';
//import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/switchMap';
//import 'rxjs/add/operator/toPromise';

import { Observable }     	from 'rxjs/Observable';

@Injectable()
export class SearchService {
	public waiting: boolean = false;

	constructor(private http: Http) {}
	
	search(s: String) {
		return this.http.get('search.php?s='+s).map(this.extractData).catch(this.handleError);
	}

	private extractData(res: Response) {
		let body = res.json().data || {};
		let tl: Track[] = [];
		for(let i = 0; i < body.length; i++) {
			tl.push(new Track(body[i]));
		}
		return tl || { };
	}

	private handleError(error: any) {
		// In a real world app, we might use a remote logging infrastructure
		// We'd also dig deeper into the error to get a better message
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
			console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}

}
