import { Component, OnInit } from "@angular/core";

import { UrlService, UrlSegment } from "./url.service";
import { File } from "./File";
import { PlaylistService } from "./playlist.service";

@Component({
    selector: "playlist-bar",
    templateUrl: "playlist-bar.component.html"
})
export class PlaylistBarComponent implements OnInit {

    newPlaylistName: string;

    constructor(
        private playlistService: PlaylistService,
    ) {
        this.newPlaylistName = "";
    }

    addPlaylist() {
        let r: boolean = this.playlistService.addPlaylist(this.newPlaylistName);
        console.log(r);
        if (r) {
            this.playlistService.save();
            console.log("saving");
        }
    }

    ngOnInit() {
    }
}
