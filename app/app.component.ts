import { Component, ViewChild, Input, OnInit, OnDestroy, HostListener } from "@angular/core";
import { SearchBarComponent } from "./search-bar.component";
import { ResultsComponent } from "./results.component";
import { PlayerComponent } from "./player.component";
import { Track } from "./Track";
import { SearchService } from "./search.service";
import { ROUTER_DIRECTIVES, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: "listen-music-player",
    template: `
        <div class="main-app">
            <search-bar [query]="query" (onFoundTracks)="onFoundTracks($event)"></search-bar>
            <results (onPlayTrack)="onPlayTrack($event)" [tracks]="tracks"></results>
            <player (onPrevSong)="onPrevSong()" (onNextSong)="onNextSong()"></player>
        </div>
    `,
    directives: [SearchBarComponent, ResultsComponent, PlayerComponent, ROUTER_DIRECTIVES],
    providers: [SearchService]
})
export class AppComponent implements OnInit {
    tracks: Track[] = [];
    @ViewChild(PlayerComponent) player: PlayerComponent;
    @ViewChild(ResultsComponent) results: ResultsComponent;
    @ViewChild(SearchBarComponent) searchBar: SearchBarComponent;
    query: string;
    private sub: Subscription;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.query = params["query"] || "";
            if (this.query !== "") {
                this.searchBar.search(this.query);
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onNextSong() {
        console.log(Date.now());
        let playing = document.querySelector(".active") as HTMLElement;
        let next = playing.nextElementSibling as HTMLElement;
        if (next != null) {
            let src = next.dataset["src"];
            this.results.currentTrack = src;
            this.onPlayTrack(src);
            console.log(Date.now());
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
    shortcut(e) {
        if(document.activeElement != document.getElementById("searchInput")) {
            e.preventDefault();
            e.stopPropagation();
            if (e.keyCode == 75) {
                this.player.pauseplay();
            }
            if (e.keyCode == 39 || e.keycode == 78) {
                this.onNextSong();
            }
            if (e.keyCode == 37 || e.keycode == 80) {
                this.onPrevSong();
            }
            return false;
        }
    }

}
