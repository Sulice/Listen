import { NgModule, Component} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from "./app.component";
import { MusicPlayerComponent } from "./music-player.component";
import { SearchBarComponent } from "./search-bar.component";
import { ResultsComponent } from "./results.component";
import { PlayerComponent } from "./player.component";
import { FileComponent } from "./file.component";
import { HoverEntryDirective } from "./hover-entry.directive";

import { SearchService } from "./search.service";
import { UrlService } from "./url.service";

@NgModule({
  imports: [ 
      BrowserModule,
      HttpModule,
      JsonpModule,
      FormsModule,
  ],
  declarations: [ 
      AppComponent,
      FileComponent,
      HoverEntryDirective,
      MusicPlayerComponent,
      PlayerComponent,
      ResultsComponent,
      SearchBarComponent,
  ],
  providers: [
      SearchService,
      UrlService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
