import { provideRouter, RouterConfig } from "@angular/router";
import { AppComponent } from "./app.component";

const routes: RouterConfig = [
  { path: ":query", component: AppComponent },
  { path: "", component: AppComponent },
];

export const appRouterProviders = [
  provideRouter(routes)
];

