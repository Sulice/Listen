import { Component, ViewContainerRef } from "@angular/core";
import { MusicPlayerComponent } from "./music-player.component";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "main",
    template: `
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    query: string;
    private viewContainerRef: ViewContainerRef;

    constructor(private route: ActivatedRoute, viewContainerRef:ViewContainerRef) { 
        this.viewContainerRef = viewContainerRef; 
    }
}
