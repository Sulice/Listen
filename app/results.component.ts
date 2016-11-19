import { Component, Input, Output, EventEmitter, AfterViewInit} from "@angular/core";
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
                        <tr 
                            *ngFor="let file of files" 
                            [class.active]="currentSong == file.src" 
                            (click)="selectFile(file.src)" 
                            [attr.data-src]="file.src"
                        >
                            <h6 *ngIf="file.artist.length > 0">{{file.artist}} - {{file.album}}</h6>
                            <i *ngIf="file.artist.length == 0" class="glyphicon glyphicon-folder-close fileIcon"></i>
                            <h5>{{file.name}}</h5>
                        </tr>
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
        console.log(src);
        if(src.match(/\.mp3$/)) {
            console.log("read song");
            this.loadSong(src);
        } else {
            console.log("opendir");
            this.onOpenDir.emit(src);
        }
    }

    loadSong(src: string) {
        this.currentSong = src;
        this.onPlaySong.emit(this.currentSong);
    }
}
