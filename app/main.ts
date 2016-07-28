import { Component, provide } from "@angular/core";
import { bootstrap } from "@angular/platform-browser-dynamic";
import { AppComponent } from "./app.component";
import { HTTP_PROVIDERS } from "@angular/http";
import { appRouterProviders } from './app.routes';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'main',
    directives: [ROUTER_DIRECTIVES],
    template: `
    <router-outlet></router-outlet>
    `
})
export class MainComponent {
    query: string;
}

bootstrap(
    MainComponent, 
    [
        HTTP_PROVIDERS, 
        appRouterProviders,
        provide(LocationStrategy, {useClass: HashLocationStrategy})
    ]
).catch(err => console.error(err));
