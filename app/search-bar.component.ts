import { Component, EventEmitter, Output, ViewChild, Input, OnInit } from "@angular/core";
import { SearchService } from "./search.service";
import { File } from "./File";
import { Observable } from "rxjs/Observable";
import { UrlService } from "./url.service";

@Component({
    selector: "search-bar",
    templateUrl: "search-bar.component.html"
})
export class SearchBarComponent {
    @Output() onFoundFiles = new EventEmitter<File[]>();
    @Input() query: string;
    searchTerm: string = "";
    request: Observable<string>;
    requestStartTime: number;

    constructor(private searchService: SearchService, private urlService: UrlService) {}

    ngOnInit() {
        let input = document.getElementById('searchInput');
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
        this.searchService.browse(q).subscribe(
            r => {
                let duration:number = Date.now() - this.requestStartTime;
                console.log("request duration : "+duration+"ms");
                this.onFoundFiles.emit(r);
            },
            error => console.log(error)
        );
    }

    search(q: string) {
        if (q === undefined || q === "" || q === null) {
            if(this. searchTerm !== "") {
                // empty query, re-browse
                this.searchTerm = "";
                let segment: any = this.urlService.deconstructURL();
                this.browse(segment.path);
            }
            return;
        }
        if(this.searchTerm == q.trim()) {
            // nothing changed, false alert.
            return;
        }
        this.urlService.writeSearchURL(q);
        this.searchTerm = q;
        if (q.length < 1) {
            this.onFoundFiles.emit([]);
            return;
        }

        let segment: any = this.urlService.deconstructURL();

        let that:any = this;
        let request: Observable<string> = this.searchService.search(q, segment.path);
        window.setTimeout(function() {
            if(that.searchTerm == q) {
                that.request = request;
                that.requestStartTime = Date.now();
                request.subscribe(
                    r => {
                        if(that.searchTerm == q) {
                            let duration:number = Date.now() - that.requestStartTime;
                            console.log("request duration : "+duration+"ms");
                            that.onFoundFiles.emit(r);
                        }
                    },
                    error => console.log(error)
                );
            }
        }, 300);
    }
}
