import { NgModule, Component} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule }   from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from "./app.component";
import { MusicPlayerComponent } from "./music-player.component";
import { SearchBarComponent } from "./search-bar.component";
import { ResultsComponent } from "./results.component";
import { PlayerComponent } from "./player.component";
import { FileComponent } from "./file.component";

import { SearchService } from "./search.service";

const routes: Routes = [
    { path: ":mode/:query", component: MusicPlayerComponent },
    { path: ":mode", component: MusicPlayerComponent },
    { path: "", component: MusicPlayerComponent }
];

@NgModule({
  imports: [ 
      BrowserModule,
      HttpModule,
      JsonpModule,
      FormsModule,
      RouterModule.forRoot(routes, { useHash: true })
  ],
  declarations: [ 
      AppComponent,
      MusicPlayerComponent,
      SearchBarComponent,
      ResultsComponent,
      PlayerComponent,
      FileComponent
  ],
  providers: [
      SearchService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
