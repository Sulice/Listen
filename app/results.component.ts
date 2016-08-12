/// <reference path="../typings/index.d.ts" />

import { Component, Input, Output, EventEmitter, AfterViewInit} from "@angular/core";
import { Track } from "./Track";
import { SearchService } from "./search.service";
import * as $ from 'jquery';

@Component({
    selector: "results",
    template: `
        <div class="results">
            <div class="nano">
                <div class="nano-content">
                    <table class="table table-hover table-bordered">
                        <tr 
                            *ngFor="let track of tracks" 
                            [class.active]="currentTrack == track.src" 
                            class="list-group-item" 
                            (click)="loadSong(track.src)" 
                            [attr.data-src]="track.src"
                        >
                            <h6>{{track.artist}} - {{track.album}}</h6>
                            <h5>{{track.title}}</h5>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `
})
export class ResultsComponent {
    @Input() tracks: Track[] = [];
    @Output() onPlayTrack = new EventEmitter<string>();
    currentTrack: string;

    constructor(public searchService: SearchService) {}

    ngAfterViewInit() {
        setInterval(function() {
            let b:any = $(".nano");
            b.nanoScroller();
        }, 1000);
    }

    loadSong(src: string) {
        this.currentTrack = src;
        this.onPlayTrack.emit(this.currentTrack);
    }

}
