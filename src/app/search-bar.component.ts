import { Component, EventEmitter, Output, ViewChild, Input, OnInit } from "@angular/core";

import { UrlService, UrlSegment } from "./url.service";
import { SearchService } from "./search.service";
import { File } from "./File";

@Component({
    selector: "search-bar",
    templateUrl: "search-bar.component.html"
})
export class SearchBarComponent implements OnInit {
    @Output() onInput = new EventEmitter<string>();
    @Input() query: string;
    @Input() searching: boolean;

    constructor() {
        this.query = "";
        this.searching = false;
    }

    ngOnInit() {
        let input = document.getElementById("searchInput");
        input.focus();
    }

    emitInput(r: string) {
        this.onInput.emit(r);
    }
}
