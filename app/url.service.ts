import { Injectable } from "@angular/core";

@Injectable()
export class UrlService {
    deconstructURL(): string[] {
        let url: string = window.location.href.replace(/^[^#]+#?/, "") 
        if (url == "") {
            return [];
        }

        return url.split("#");
    }

    writeURL(path: string = "/", search: string = ""): void {
        let base: string = window.location.href.split("#")[0];
        //console.log(base);
        //console.log(path);
        //console.log(search);
        history.replaceState({}, "", base + "#" + path + "#" + search);
    }
    
    // just change the search term
    writeSearchURL(search: string = ""): void {
        let a: string[] = this.deconstructURL();
        //console.log(a);
        this.writeURL(a[0], search);
    }
}
