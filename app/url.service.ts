import { Injectable } from "@angular/core";

@Injectable()
export class UrlService {
    deconstructURL(): string[] {
        let url: string = window.location.href.replace(/^[^#]+#?/, "") 
        if (url == "") {
            return [];
        }

        let a: string[] = url.split("#");
        // TODO map function
        for(let i = 0; i < a.length; i++) {
            a[i] = decodeURI(a[i]);
        }
        return a;
    }

    writeURL(path: string = "/", search: string = ""): void {
        let base: string = this.getBaseUrl();
        //console.log(base);
        //console.log(path);
        //console.log(search);
        history.replaceState({}, "", base + "#" + encodeURI(path) + "#" + encodeURI(search));
    }
    
    // just change the search term
    writeSearchURL(search: string = ""): void {
        let a: string[] = this.deconstructURL();
        //console.log(a);
        this.writeURL(a[0], search);
    }

    getBaseUrl(): string {
        return window.location.href.split("#")[0];
    }
}
