import { Component, Input, Output, EventEmitter, AfterViewInit} from "@angular/core";
import { FileComponent } from "./file.component";
import { File } from "./File";
import { SearchService } from "./search.service";
declare var $:JQueryStatic;

@Component({
    selector: "results",
    template: `
        <div class="results">
            <div class="nano">
                <div class="nano-content">
                    <table>
                        <file 
                            *ngFor="let file of files" 
                            [class.active]="currentSong == file.src" 
                            (click)="selectFile(file.src)" 
                            [attr.data-src]="file.src"
                            [file]="file"
                        >
                        </file>
                    </table>
                </div>
            </div>
        </div>
    `,
    styleUrls: ["results.component.css"]
})
export class ResultsComponent {
    @Input() files: File[] = [];
    @Output() onPlaySong = new EventEmitter<string>();
    @Output() onOpenDir = new EventEmitter<string>();
    currentSong: string;

    constructor(public searchService: SearchService) {}

    ngAfterViewInit() {
        setInterval(function() {
            let b:any = $(".nano");
            b.nanoScroller();
        }, 1000);
    }

    selectFile(src: string) {
        if(src.match(/\.mp3$/)) {
            this.loadSong(src);
        } else {
            this.onOpenDir.emit(src);
        }
    }

    loadSong(src: string) {
        this.currentSong = src;
        this.onPlaySong.emit(this.currentSong);
    }
}
