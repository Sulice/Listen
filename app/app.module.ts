import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { HoverEntryDirective } from "./hover-entry.directive";

import { PerfectScrollbarModule } from "angular2-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "angular2-perfect-scrollbar";

import { AppComponent } from "./app.component";
import { FileComponent } from "./file.component";
import { MusicPlayerComponent } from "./music-player.component";
import { PlayerComponent } from "./player.component";
import { ResultsComponent } from "./results.component";
import { SearchBarComponent } from "./search-bar.component";
import { PlaylistBarComponent } from "./playlist-bar.component";
import { SearchService } from "./search.service";
import { PlaylistService } from "./playlist.service";
import { UrlService } from "./url.service";

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
  imports: [
      BrowserModule,
      HttpModule,
      FormsModule,
      PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
  ],
  declarations: [
      AppComponent,
      FileComponent,
      HoverEntryDirective,
      MusicPlayerComponent,
      PlayerComponent,
      ResultsComponent,
      SearchBarComponent,
      PlaylistBarComponent,
  ],
  providers: [
      SearchService,
      PlaylistService,
      UrlService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
