import { Component, ViewContainerRef } from "@angular/core";
import { MusicPlayerComponent } from "./music-player.component";

@Component({
    selector: "main",
    template: `<music-player></music-player>`
})
export class AppComponent {
    private viewContainerRef: ViewContainerRef;

    constructor(viewContainerRef:ViewContainerRef) { 
        this.viewContainerRef = viewContainerRef; 
    }
}
