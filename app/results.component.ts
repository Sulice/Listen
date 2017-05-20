import { Component, Input, Output, EventEmitter } from "@angular/core";

import { FileComponent } from "./file.component";
import { File } from "./File";
import { SearchService } from "./search.service";

@Component({
    selector: "results",
    templateUrl: "results.component.html"
})
export class ResultsComponent {
    @Input() files: File[] = [];
    @Output() onPlaySong = new EventEmitter<string>();
    @Output() onOpenDir = new EventEmitter<string>();
    currentSong: string;

    constructor(public searchService: SearchService) {}

    selectFile(src: string) {
        if (src.match(/\.mp3$/)) {
            this.loadSong(src);
        } else {
            this.onOpenDir.emit(src);
        }
    }

    loadSong(src: string) {
        this.currentSong = src;
        this.onPlaySong.emit(this.currentSong);
    }

    centerActive(): void {
        let active: HTMLElement = document.querySelector(".active") as HTMLElement;
        let results: HTMLElement = document.querySelector(".results") as HTMLElement;
        document.querySelector("perfect-scrollbar").scrollTop = active.offsetTop - results.offsetHeight / 2 + active.offsetHeight / 2;
    }

    scrollUp(): void {
        if (document.getElementsByTagName("file").length > 0) {
            let file: HTMLElement = document.getElementsByTagName("file")[0] as HTMLElement;
            document.querySelector("perfect-scrollbar").scrollTop += file.offsetHeight;
        }
    }

    scrollDown(): void {
        if (document.getElementsByTagName("file").length > 0) {
            let file: HTMLElement = document.getElementsByTagName("file")[0] as HTMLElement;
            document.querySelector("perfect-scrollbar").scrollTop -= file.offsetHeight;
        }
    }

    resetScroll(): void {
        window.setTimeout(function() {
            let ps: NodeListOf<Element> = document.getElementsByTagName("PERFECT-SCROLLBAR");
            if (ps.length > 0) {
                ps[0].scrollTop = 0;
            }
        }, 10);
    }
}
