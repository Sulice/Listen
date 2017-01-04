import { Injectable } from "@angular/core";
import { File } from "./File";
import { Http, Response } from "@angular/http";

// Statics
import "rxjs/add/observable/throw";

// Operators
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Observable } from "rxjs/Observable";

@Injectable()
export class SearchService {

    constructor(private http: Http) {}

    browse(s: string) {
        return this.http.get("browse.php?s=" + s).map(this.extractData).catch(this.handleError);
    }

    search(s: string) {
        return this.http.get("search.php?s=" + s).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json().data || {};
        let tl: File[] = [];
        let s = body[0];
        if(s == "") {
            s = "/";
        }
        for (let i = 0; i < body.length; i+=2 ) {
            // if the file has a length of 0, skip it.
            if(body[i] != "" && body[i+1] != 0) {
                tl.push(new File(body[i], body[i+1], s));
            }
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
