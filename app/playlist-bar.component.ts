import { Component, OnInit } from "@angular/core";

import { UrlService, UrlSegment } from "./url.service";
import { File } from "./File";

@Component({
    selector: "playlist-bar",
    templateUrl: "playlist-bar.component.html"
})
export class PlaylistBarComponent implements OnInit {
    ngOnInit() {
    }
}
