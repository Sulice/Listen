import { Injectable } from "@angular/core";

@Injectable()
export class UrlService {
    deconstructURL() {
        let url: string = window.location.href.replace(/^[^#]+#?/, "");
        //let url: string = window.location.href.split("#")[1];
        let segment: any = {};

        if (!url) {
            segment.search = "";
            segment.path = "";
        } else {
            let s: string[] = url.split("?");
            segment.path = decodeURIComponent(s[0]);
            segment.search = decodeURIComponent(s[1]);
        }
        return segment;
    }

    writeURL(path: string = "/", search: string = ""): void {
        let base: string = this.getBaseUrl();
        let url: string = base + "#";
        if (search) {
            url = url + encodeURIComponent(path) + "?" + encodeURIComponent(search);
        } else {
            url = url + encodeURIComponent(path);
        }
        history.replaceState({}, "", url);
    }
    
    // just change the search term
    writeSearchURL(search: string = ""): void {
        let segment: any = this.deconstructURL();
        this.writeURL(segment.path, search);
    }

    getBaseUrl(): string {
        return window.location.href.split("#")[0];
    }
}
