import { Component, ViewChild, Input, OnInit, OnDestroy, HostListener, ViewContainerRef } from "@angular/core";
import { PlatformLocation } from '@angular/common'
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
        <player [numberOfTracks]="numberOfTracks" [playlistDuration]="playlistDuration" (onPrevSong)="onPrevSong()" (onNextSong)="onNextSong()"></player>
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
    playlistDuration: string = "";
    numberOfTracks: number = 0;


    calculateStats() {
        if(this.files.length > 0) {
            let d: number = 0;
            let t: number = 0;
            for(let file of this.files) {
                if(file.durationInSeconds) {
                    d = d + file.durationInSeconds;
                    t++;
                }
            }
            this.playlistDuration = new File("").formatTime(d);
            this.numberOfTracks = t;
        }
    }

    constructor(
        private location: PlatformLocation,
        private urlService: UrlService, 
        viewContainerRef:ViewContainerRef
    ) { 
        this.viewContainerRef = viewContainerRef; 
    }

    backToRoot() {
        this.searchBar.browse("");
        this.urlService.writeURL(); 
    }

    doStuffBasedOnURL() {
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

    private centerActive(): void {
        document.querySelector('perfect-scrollbar').scrollTop = document.querySelector('.active').offsetTop - document.querySelector('.results').offsetHeight/2 + document.querySelector('.active').offsetHeight/2;
    }

    private scrollUp(): void {
        if(document.getElementsByTagName('file').length > 0) {
            document.querySelector('perfect-scrollbar').scrollTop += document.getElementsByTagName('file')[0].offsetHeight;
        }
    }
    
    private scrollDown(): void {
        if(document.getElementsByTagName('file').length > 0) {
            document.querySelector('perfect-scrollbar').scrollTop -= document.getElementsByTagName('file')[0].offsetHeight;
        }
    }

    private resetScroll(): void {
        window.setTimeout(function() {
            let ps: NodeListOf<Element> = document.getElementsByTagName("PERFECT-SCROLLBAR");
            if(ps.length > 0) {
                ps[0].scrollTop = 0;
            }
        }, 10);
    }

    onFoundFiles(t: File[]) {
        this.files = t;
        this.calculateStats();
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

    @HostListener('window:keydown', ['$event'])
    shortcut(e:any) {
        if (e.keyCode == 40) {
            e.preventDefault();
            e.stopPropagation();
            this.scrollUp();
            return false;
        }
        if (e.keyCode == 38) {
            e.preventDefault();
            e.stopPropagation();
            this.scrollDown();
            return false;
        }
        if(document.activeElement != document.getElementById("searchInput")) {
            if (e.keyCode == 75 || e.keyCode == 32) {
                e.preventDefault();
                e.stopPropagation();
                this.player.pauseplay();
                return false;
            }
            if (e.keyCode == 39) {
                e.preventDefault();
                e.stopPropagation();
                this.onNextSong();
                return false;
            }
            if (e.keyCode == 37) {
                e.preventDefault();
                e.stopPropagation();
                this.onPrevSong();
                return false;
            }
            if(e.keyCode == 80) {
                e.preventDefault();
                e.stopPropagation();
                this.centerActive();
                return false;
            }
            if (e.keyCode == 83) {
                e.preventDefault();
                e.stopPropagation();
                document.getElementById("searchInput").focus();
                return false;
            }
        } else {
            if (e.keyCode == 13) {
                e.preventDefault();
                e.stopPropagation();
                document.getElementById("searchInput").blur();
                return false;
            }
        }
    }
}
