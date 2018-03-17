import { Component, Input } from "@angular/core";

import { File } from "./File";

@Component({
    selector: "file",
    template: `
        <div class="file" hoverEntry>
            <div [ngClass]="this.file.class"></div>
            <div class="description">
                <div class="title"><span>{{this.file.name}}</span></div>
                <div class="sub-line" *ngIf="this.file.type == 'song'">
                    <span class="album">{{this.file.album}}</span>
                    <span class="separator fa fa-circle"></span>
                    <span class="artist">{{this.file.artist}}</span>
                </div>
            </div>
            <div class="duration" *ngIf="this.file.type == 'song'">{{this.file.duration}}</div>
        </div>
    `
})
export class FileComponent {
    @Input() file: File;
}
