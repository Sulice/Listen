import { Component, Input, Output, EventEmitter, AfterViewInit} from "@angular/core";
import { File } from "./File";

@Component({
    selector: "file",
    template: `
        <div class="file">
            <i [ngClass]="this.file.class"></i>
            <div class="description">
                <div class="text-description">
                    <div class="artist" *ngIf="this.file.type == 'song'">{{this.file.artist}}</div>
                    <span class="title">{{this.file.name}}</span> -
                    <span class="album" *ngIf="this.file.type == 'song'">{{this.file.album}}</span>
                </div>
                <span class="duration" *ngIf="this.file.type == 'song'">{{this.file.duration}}</span>
            </div>
        </div>
    `
})
export class FileComponent {
    @Input() file: File;
}
