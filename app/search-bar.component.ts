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
    mode: string = "b";
    searchTerm: string = "";
    request: Observable<string>;
    requestStartTime: number;

    constructor(private searchService: SearchService, private urlService: UrlService) {}

    ngOnInit() {
        let input = document.getElementById('searchInput');
        input.focus();
    }
    
    browse(q: string) {
        if (q !== undefined && q !== "" && q !== null) {
            //q = encodeURI(q.replace(/\s+/gi,"+"));
            q = encodeURI(q);
        } else {
            q = "";
        }
        this.urlService.writeURL(q);
        this.searchService.browse(q).subscribe(
            r => {
                this.onFoundFiles.emit(r);
            },
            error => console.log(error)
        );
    }

    search(q: string) {
        if (q !== undefined && q !== "" && q !== null) {
            q = encodeURI(q.replace(/\s+/g,"+"));
        } else {
            q = "";
        }
        if(this.searchTerm == q) {
            // nothing changed, false alert.
            return;
        }
        console.log("q:"+q);
        this.urlService.writeSearchURL(q);
        this.searchTerm = q;
        if (q.length < 1) {
            this.onFoundFiles.emit([]);
            return;
        }
        let that:any = this;
        let request: Observable<string> = this.searchService.search(q);
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
