import { Injectable } from "@angular/core";
import { File } from "./File";
import { Http, Response } from "@angular/http";

// Operators
import "rxjs/add/operator/map";

import { Observable } from "rxjs/Observable";

@Injectable()
export class SearchService {

    constructor(private http: Http) {}

    browse(q: string = "") {
        return this.http.get("php/browse.php?q=" + encodeURIComponent(q)).map(this.extractBrowseData);
    }

    search(q: string = "", d: string = "") {
        if (q === "!random") {
            return this.http.get("php/random.php?d=" + encodeURIComponent(d)).map(this.extractSearchData);
        } else {
            return this.http.get("php/search.php?d=" + encodeURIComponent(d) + "&q=" + encodeURIComponent(q)).map(this.extractSearchData);
        }
    }

    private extractSearchData(res: Response) {
        let body = res.json() || {};
        let tl: File[] = [];
        for (let i = 0; i < body.data.length; i++ ) {
            // if the file has a length of 0, skip it.
            if (body.data[i][0] != "" && body.data[i][1] != 0) {
                tl.push(new File(body.data[i][0], body.data[i][1]));
            }
        }
        return tl || { };
    }

    private extractBrowseData(res: Response) {
        let body = res.json() || {};
        let tl: File[] = [];
        let p = body["parent"];
        if (p == "") {
            p = "/";
        }
        for (let i = 0; i < body.data.length; i++ ) {
            // if the file has a length of 0, skip it.
            if (body.data[i][0] != "" && body.data[i][1] != 0) {
                tl.push(new File(body.data[i][0], body.data[i][1], p));
            }
        }
        return tl || [];
    }
}
