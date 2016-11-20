import { Component, ViewChild, Input, OnInit, OnDestroy, HostListener, ViewContainerRef } from "@angular/core";
import { SearchBarComponent } from "./search-bar.component";
import { ResultsComponent } from "./results.component";
import { PlayerComponent } from "./player.component";
import { FileComponent } from "./file.component";
import { File } from "./File";
import { SearchService } from "./search.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "music-player",
    template: `
        <search-bar [query]="query" (onFoundFiles)="onFoundFiles($event)"></search-bar>
        <div class="main-app" [class.reduced]="player.playedSong!=null">
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
    mode: string;
    private sub: Subscription;
    private viewContainerRef: ViewContainerRef;

    constructor(private route: ActivatedRoute, viewContainerRef:ViewContainerRef) { 
        this.viewContainerRef = viewContainerRef; 
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.query = params["query"] || "";
            this.mode = params["mode"] || "";
            if (this.query !== "" && this.query !== undefined && this.query !== null) {
                this.query = decodeURIComponent(this.query);
            }
            switch (this.mode) {
                case "s":
                    this.searchBar.selectMode("s");
                    this.searchBar.search(this.query);
                    break;
                case "b":
                    this.searchBar.selectMode("b");
                    this.searchBar.browse(this.query);
                    break;
                default:
                    console.log("unknown mode");
                    break;
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onNextSong() {
        let playing = document.querySelector(".active") as HTMLElement;
        let next = playing.nextElementSibling as HTMLElement;
        if (next != null) {
            let src = next.dataset["src"];
            this.results.currentSong = src;
            this.onPlaySong(src);
        }
    }
    onPrevSong() {
        let playing = document.querySelector(".active") as HTMLElement;
        let prev = playing.previousElementSibling as HTMLElement;
        if (prev != null) {
            this.results.loadSong(prev.dataset["src"]);
        }
    }

    onFoundFiles(t: File[]) {
        this.files = t;
    }
    
    onPlaySong(src: string) {
        this.player.playedSong = src;
        this.player.startSong();
    }

    onOpenDir(src: string) {
        this.searchBar.selectMode("b");
        this.searchBar.browse(src);
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
        }
    }
}
