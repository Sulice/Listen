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
        <search-bar [query]="query" (onFoundTracks)="onFoundTracks($event)"></search-bar>
        <div class="main-app" [class.reduced]="player.playedTrack!=null">
            <results (onPlayTrack)="onPlayTrack($event)" [tracks]="tracks"></results>
        </div>
        <player (onPrevSong)="onPrevSong()" (onNextSong)="onNextSong()"></player>
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
        this.new_bg();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onNextSong() {
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
        
    new_bg() {
        let wr:number = window.innerWidth+Math.floor(Math.random()*10);
        let hr:number = window.innerHeight+Math.floor(Math.random()*10);
        document.getElementsByTagName('body')[0].style.backgroundImage = "url(https://unsplash.it/"+wr+"/"+hr+"/?random)";
    }

    @HostListener('window:keyup', ['$event'])
    shortcut(e) {
        if(document.activeElement != document.getElementById("searchInput")) {
            e.preventDefault();
            e.stopPropagation();
            if (e.keyCode == 75) {
                this.player.pauseplay();
            }
            if (e.keyCode == 88 && !e.ctrlKey) {
                this.new_bg();
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
