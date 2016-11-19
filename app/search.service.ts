import { Injectable } from "@angular/core";
import { File } from "./File";
import { Http, Response } from "@angular/http";

// Statics
import "rxjs/add/observable/throw";

// Operators
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Observable }       from "rxjs/Observable";

@Injectable()
export class SearchService {

    constructor(private http: Http) {}

    browse(s: string) {
        console.log(s);
        return this.http.get("browse.php?s=" + s).map(this.extractData).catch(this.handleError);
    }

    search(s: string) {
        console.log(s);
        return this.http.get("search.php?s=" + s).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json().data || {};
        let tl: File[] = [];
        for (let i = 0; i < body.length; i++ ) {
            tl.push(new File(body[i]));
        }
        return tl || { };
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We"d also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : "Server error";
            // console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}
