import { Component, ViewChild, Input, OnInit, OnDestroy, HostListener, ViewContainerRef } from "@angular/core";
import { SearchBarComponent } from "./search-bar.component";
import { ResultsComponent } from "./results.component";
import { PlayerComponent } from "./player.component";
import { FileComponent } from "./file.component";
import { File } from "./File";
import { SearchService } from "./search.service";
import { Subscription } from "rxjs";
import { UrlService } from "./url.service";

@Component({
    selector: "music-player",
    template: `
        <div id="logo" (click)="backToRoot()">
            <h1>LISTEN</h1>
            <svg>
                <path d="M4 47h11v19H4zm17-35h10v54H21zm17 13h10v41H38zM54 4h11v62H54zm17 8h11v54H71zm17 23h11v31H88z"/>
            </svg>
        </div>
        <search-bar [query]="query" (onFoundFiles)="onFoundFiles($event)"></search-bar>
        <div class="main-app">
            <results (onPlaySong)="onPlaySong($event)" (onOpenDir)="onOpenDir($event)" [files]="files"></results>
        </div>
        <player (onPrevSong)="onPrevSong()" (onNextSong)="onNextSong()"></player>
    `
})
export class MusicPlayerComponent implements OnInit {
    files: File[] = [];
    @ViewChild(PlayerComponent) player: PlayerComponent;
    @ViewChild(ResultsComponent) results: ResultsComponent;
    @ViewChild(SearchBarComponent) searchBar: SearchBarComponent;
    query: string;
    private sub: Subscription;
    private viewContainerRef: ViewContainerRef;

    constructor(private urlService: UrlService, viewContainerRef:ViewContainerRef) { 
        this.viewContainerRef = viewContainerRef; 
    }

    backToRoot() {
        this.searchBar.browse("");
        this.urlService.writeURL(); 
    }

    ngOnInit() {
        let segment: any = this.urlService.deconstructURL();
        if (typeof(segment.search) === "undefined") {
            segment.search = "";
        }
        this.query = segment.search;
        this.urlService.writeURL(segment.path, segment.search);
        if (segment.search === "") {
            this.searchBar.browse(segment.path);
        } else {
            this.searchBar.search(segment.search);
        }
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

    private resetScroll(): void {
        window.setTimeout(function() {
            let ps: HTMLElement[] = document.getElementsByTagName("PERFECT-SCROLLBAR");
            if(ps.length > 0) {
                ps[0].scrollTop = 0;
            }
        }, 10);
    }

    onFoundFiles(t: File[]) {
        this.files = t;
        this.resetScroll();
    }
    
    onPlaySong(src: string) {
        this.player.playedSong = src;
        this.player.startSong();
    }

    onOpenDir(src: string) {
        this.searchBar.browse(src);
        this.resetScroll();
    }

    @HostListener('window:keyup', ['$event'])
    shortcut(e:any) {
        if(document.activeElement != document.getElementById("searchInput")) {
            e.preventDefault();
            e.stopPropagation();
            if (e.keyCode == 75) {
                this.player.pauseplay();
            }
            if (e.keyCode == 39 || e.keyCode == 78) {
                this.onNextSong();
            }
            if (e.keyCode == 37 || e.keyCode == 80) {
                this.onPrevSong();
            }
            return false;
        } else {
            if (e.keyCode == 13) {
                document.getElementById("searchInput").blur();
            }
        }
    }
}
