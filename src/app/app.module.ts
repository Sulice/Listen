import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { HoverEntryDirective } from "./hover-entry.directive";

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

import { AppComponent } from "./app.component";
import { FileComponent } from "./file.component";
import { MusicPlayerComponent } from "./music-player.component";
import { PlayerComponent } from "./player.component";
import { PlaylistBarComponent } from "./playlist-bar.component";
import { PlaylistService } from "./playlist.service";
import { ResultsComponent } from "./results.component";
import { SearchBarComponent } from "./search-bar.component";
import { SearchService } from "./search.service";
import { UrlService } from "./url.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        PerfectScrollbarModule,
    ],
    declarations: [
        AppComponent,
        FileComponent,
        HoverEntryDirective,
        MusicPlayerComponent,
        PlayerComponent,
        PlaylistBarComponent,
        ResultsComponent,
        SearchBarComponent,
    ],
    providers: [
        PlaylistService,
        SearchService,
        UrlService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
