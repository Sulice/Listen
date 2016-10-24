import { Component, ViewChild, Input, OnInit, OnDestroy, HostListener, ViewContainerRef } from "@angular/core";
import { SearchBarComponent } from "./search-bar.component";
import { ResultsComponent } from "./results.component";
import { PlayerComponent } from "./player.component";
import { Track } from "./Track";
import { SearchService } from "./search.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "music-player",
    template: `
        <search-bar [query]="query" (onFoundTracks)="onFoundTracks($event)"></search-bar>
        <div class="main-app" [class.reduced]="player.playedTrack!=null">
            <results (onPlayTrack)="onPlayTrack($event)" [tracks]="tracks"></results>
        </div>
        <player (onPrevSong)="onPrevSong()" (onNextSong)="onNextSong()"></player>
    `
})
export class MusicPlayerComponent implements OnInit {
    tracks: Track[] = [];
    @ViewChild(PlayerComponent) player: PlayerComponent;
    @ViewChild(ResultsComponent) results: ResultsComponent;
    @ViewChild(SearchBarComponent) searchBar: SearchBarComponent;
    query: string;
    private sub: Subscription;
    private viewContainerRef: ViewContainerRef;

    constructor(private route: ActivatedRoute, viewContainerRef:ViewContainerRef) { 
        this.viewContainerRef = viewContainerRef; 
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.query = decodeURI(params["query"]) || "";
            if (this.query !== "") {
                this.searchBar.search(this.query);
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onNextSong() {
        console.log('received next event');
        let playing = document.querySelector(".active") as HTMLElement;
        let next = playing.nextElementSibling as HTMLElement;
        if (next != null) {
            let src = next.dataset["src"];
            this.results.currentTrack = src;
            this.onPlayTrack(src);
        }
    }
    onPrevSong() {
        let playing = document.querySelector(".active") as HTMLElement;
        let prev = playing.previousElementSibling as HTMLElement;
        if (prev != null) {
            this.results.loadSong(prev.dataset["src"]);
        }
    }

    onFoundTracks(t: Track[]) {
        this.tracks = t;
    }

    onPlayTrack(src: string) {
        this.player.playedTrack = src;
        this.player.startSong();
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
