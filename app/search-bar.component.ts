import { Component, EventEmitter, Output, ViewChild, Input, OnInit } from "@angular/core";
import { SearchService } from "./search.service";
import { File } from "./File";
import { Observable } from "rxjs/Observable";
import { UrlService, UrlSegment } from "./url.service";

@Component({
    selector: "search-bar",
    templateUrl: "search-bar.component.html"
})
export class SearchBarComponent implements OnInit {
    @Output() onFoundFiles = new EventEmitter<File[]>();
    @Input() query: string;
    searchTerm: string = "";
    request: Observable<File[]>;
    requestStartTime: number;
    searching: boolean = false;

    constructor(private searchService: SearchService, private urlService: UrlService) {}

    ngOnInit() {
        let input = document.getElementById("searchInput");
        input.focus();
        this.searchTerm = this.query;
    }

    browse(q: string) {
        if (q === undefined || q === null) {
            q = "";
        }
        this.searchTerm = "";
        this.urlService.writeURL(q);
        this.requestStartTime = Date.now();
        this.searching = true;
        this.searchService.browse(q).subscribe(
            r => {
                let duration: number = Date.now() - this.requestStartTime;
                console.log("request duration : " + duration + "ms");
                this.onFoundFiles.emit(r);
                this.searching = false;
            },
            error => console.log(error)
        );
    }

    search(q: string) {
        if (q === undefined || q === "" || q === null) {
            if (this. searchTerm !== "") {
                // empty query, re-browse
                this.searchTerm = "";
                let segment: UrlSegment = this.urlService.deconstructURL();
                this.browse(segment.path);
            }
            return;
        }
        if (this.searchTerm === q.trim()) {
            // nothing changed, false alert.
            return;
        }
        this.urlService.writeSearchURL(q);
        this.searchTerm = q;
        if (q.length < 1) {
            this.onFoundFiles.emit([]);
            return;
        }

        let segment: UrlSegment = this.urlService.deconstructURL();

        let request: Observable<File[]> = this.searchService.search(q, segment.path);
        window.setTimeout(() => {
            if (this.searchTerm === q) {
                this.request = request;
                this.requestStartTime = Date.now();
                this.searching = true;
                request.subscribe(
                    r => {
                        if (this.searchTerm === q) {
                            let duration: number = Date.now() - this.requestStartTime;
                            console.log("request duration : " + duration + "ms");
                            this.onFoundFiles.emit(r);
                            this.searching = false;
                        }
                    },
                    error => console.log(error)
                );
            }
        }, 500);
    }
}
