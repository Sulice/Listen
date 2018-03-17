import { Component, ViewChild, Input, OnInit, OnDestroy, HostListener, ViewContainerRef } from "@angular/core";
import { PlatformLocation } from "@angular/common";
import { Subscription, Observable } from "rxjs";

import { SearchBarComponent } from "./search-bar.component";
import { PlaylistBarComponent } from "./playlist-bar.component";
import { ResultsComponent } from "./results.component";
import { PlayerComponent } from "./player.component";
import { FileComponent } from "./file.component";
import { File } from "./File";
import { SearchService } from "./search.service";
import { UrlService, UrlSegment } from "./url.service";

@Component({
    selector: "music-player",
    templateUrl: "music-player.component.html"
})
export class MusicPlayerComponent implements OnInit {

    @ViewChild(PlayerComponent) player: PlayerComponent;
    @ViewChild(ResultsComponent) results: ResultsComponent;
    @ViewChild(SearchBarComponent) searchBar: SearchBarComponent;
    private sub: Subscription;
    private viewContainerRef: ViewContainerRef;

    files: File[];
    query: string;
    playlistDuration: string;
    numberOfTracks: number;
    playlist: string;

    // search & browsing variables
    request: Observable<File[]>;
    requestStartTime: number;
    searching: boolean;

    constructor(
        private location: PlatformLocation,
        private urlService: UrlService,
        viewContainerRef: ViewContainerRef,
        private searchService: SearchService,
    ) {
        this.viewContainerRef = viewContainerRef;
        this.files = [];
        this.query = "";
        this.playlistDuration = "";
        this.numberOfTracks = 0;
        this.playlist = "";
        this.searching = false;
    }

    switchToSearch() {
        document.getElementsByTagName("search-bar")[0].classList.add("active");
        document.getElementsByTagName("playlist-bar")[0].classList.remove("active");
    }

    switchToPlaylist() {
        document.getElementsByTagName("search-bar")[0].classList.remove("active");
        document.getElementsByTagName("playlist-bar")[0].classList.add("active");
    }

    browse(q: string) {
        if (q === undefined || q === null) {
            q = "";
        }
        this.query = "";
        this.urlService.writeURL(q);
        this.requestStartTime = Date.now();
        this.searching = true;
        this.searchService.browse(q).subscribe(
            r => {
                let duration: number = Date.now() - this.requestStartTime;
                console.log("request duration : " + duration + "ms");
                this.onFoundFiles(r);
                this.searching = false;
            },
            error => console.log(error)
        );
    }

    search(q: string) {
        if (q === undefined || q === "" || q === null) {
            if (this.query !== "") {
                // empty query, re-browse
                this.query = "";
                let segment: UrlSegment = this.urlService.deconstructURL();
                this.browse(segment.path);
            }
            return;
        }
        if (this.query === q.trim()) {
            // nothing changed, false alert.
            return;
        }
        this.urlService.writeSearchURL(q);
        this.query = q;
        if (q.length < 1) {
            this.onFoundFiles([]);
            return;
        }

        let segment: UrlSegment = this.urlService.deconstructURL();

        let request: Observable<File[]> = this.searchService.search(q, segment.path);
        window.setTimeout(() => {
            if (this.query === q) {
                this.request = request;
                this.requestStartTime = Date.now();
                this.searching = true;
                request.subscribe(
                    r => {
                        if (this.query === q) {
                            let duration: number = Date.now() - this.requestStartTime;
                            console.log("request duration : " + duration + "ms");
                            this.onFoundFiles(r);
                            this.searching = false;
                        }
                    },
                    error => console.log(error)
                );
            }
        }, 500);
    }

    calculateStats() {
        if (this.files.length > 0) {
            let d: number = 0;
            let t: number = 0;
            for (let file of this.files) {
                if (file.durationInSeconds) {
                    d = d + file.durationInSeconds;
                    t++;
                }
            }
            this.playlistDuration = new File("").formatTime(d);
            this.numberOfTracks = t;
        }
    }

    backToRoot() {
        this.browse("");
        this.urlService.writeURL();
    }

    doStuffBasedOnURL() {
        let segment: UrlSegment = this.urlService.deconstructURL();
        if (typeof(segment.search) === "undefined") {
            segment.search = "";
        }

        this.query = segment.search;
        this.urlService.writeURL(segment.path, segment.search);
        if (segment.search === "") {
            this.browse(segment.path);
        } else {
            this.search(segment.search);
        }
    }

    ngOnInit() {
        this.doStuffBasedOnURL();
        this.location.onPopState(() => {
            this.doStuffBasedOnURL();
        });
    }

    onNextSong() {
        let playing = document.querySelector(".active") as HTMLElement;
        if (playing) {
            let next: HTMLElement = playing.nextElementSibling as HTMLElement;
            let i: number = 0; // security
            while (i < 1000) {
                if (!next) {
                    break;
                }
                if (next.dataset["src"] && next.dataset["src"].match(/\.mp3$/)) {
                    this.results.loadSong(next.dataset["src"]);
                    break;
                }
                next = next.nextElementSibling as HTMLElement;
                i++;
            }
        }
    }

    onPrevSong() {
        let playing = document.querySelector(".active") as HTMLElement;
        if (playing) {
            let prev = playing.previousElementSibling as HTMLElement;
            if (prev != null) {
                this.results.loadSong(prev.dataset["src"]);
            }
        }
    }

    onFoundFiles(t: File[]) {
        this.files = t;
        this.calculateStats();
        this.results.resetScroll();
    }

    onPlaySong(src: string) {
        this.player.playedSong = src;
        this.player.startSong();
    }

    onOpenDir(src: string) {
        this.browse(src);
        this.results.resetScroll();
    }

    // keyboard shortcuts
    /*
    @HostListener("window:keydown", ["$event"])
    shortcutDown(e: KeyboardEvent) {
        switch (e.keyCode) {
            case 40:
                e.preventDefault();
                e.stopPropagation();
                this.results.scrollUp();
                return false;
            case 38:
                e.preventDefault();
                e.stopPropagation();
                this.results.scrollDown();
                return false;
            case 13:
                e.preventDefault();
                e.stopPropagation();
                document.getElementById("searchInput").blur();
                return false;
        }
        if (document.activeElement !== document.getElementById("searchInput")) {
            switch (e.keyCode) {
                case 75:
                case 32:
                    e.preventDefault();
                    e.stopPropagation();
                    this.player.pauseplay();
                    return false;
                case 39:
                    e.preventDefault();
                    e.stopPropagation();
                    this.onNextSong();
                    return false;
                case 37:
                    e.preventDefault();
                    e.stopPropagation();
                    this.onPrevSong();
                    return false;
                case 80:
                    e.preventDefault();
                    e.stopPropagation();
                    this.results.centerActive();
                    return false;
                case 83:
                    e.preventDefault();
                    e.stopPropagation();
                    document.getElementById("searchInput").focus();
                    return false;
            }
        }
    }
 */
}
