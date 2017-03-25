import { Component, Input } from "@angular/core";

import { File } from "./File";

@Component({
    selector: "file",
    template: `
        <div class="file" hoverEntry>
            
            <div class="description">
                <div class="text-description">
                    <div class="title"><i [ngClass]="this.file.class"></i>{{this.file.name}}</div>
                    <div class="sub-line" *ngIf="this.file.type == 'song'">
                        <span class="album">{{this.file.album}}</span>
                        <span class="separator fa fa-circle"></span>
                        <span class="artist">{{this.file.artist}}</span>
                    </div>
                </div>
                <span class="duration" *ngIf="this.file.type == 'song'">{{this.file.duration}}</span>
            </div>
        </div>
    `
})
export class FileComponent {
    @Input() file: File;
}
