import { Component, Input, Output, EventEmitter, AfterViewInit} from "@angular/core";
import { File } from "./File";

@Component({
    selector: "file",
    template: `
        <tr>
            <h6 *ngIf="this.file.type == 'song'">{{this.file.artist}} - {{this.file.album}}</h6>
            <i [ngClass]="this.file.class"></i>
            <h5>{{this.file.name}}</h5>
        </tr>
    `,
    styleUrls: ["file.component.css"]
})
export class FileComponent {
    @Input() file: File;
}
