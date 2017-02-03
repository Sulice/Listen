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
            segment.path = this.decodePath(s[0]);
            segment.search = this.decodeSearch(s[1]);
        }
        return segment;
    }

    writeURL(path: string = "/", search: string = ""): void {
        let base: string = this.getBaseUrl();
        let url: string = base + "#";
        if (search) {
            url = url + this.encodePath(path) + "?" + this.encodeSearch(search);
        } else {
            url = url + this.encodePath(path);
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

    private decodePath(path: string): string {
        if(!path) {
            return "";
        }
        let segments: string[] = path.split("/");
        let decodedPath: string = "";
        for(let i = 0; i < segments.length; i++) {
            if(segments[i]) {
                decodedPath = decodedPath + "/" + decodeURIComponent(segments[i]);
            }
        }
        return decodedPath;
    }
    
    private encodePath(path: string): string {
        if(!path) {
            return "";
        }
        let segments: string[] = path.split("/");
        let encodedPath: string = "";
        for(let i = 0; i < segments.length; i++) {
            if(segments[i]) {
                encodedPath = encodedPath + "/" + encodeURIComponent(segments[i]);
            }
        }
        return encodedPath;
    }

    private decodeSearch(search: string): string {
        if(!search) {
            return "";
        }
        let segments: string[] = search.split("+");
        let decodedSearch: string = "";
        for(let i = 0; i < segments.length; i++) {
            if(segments[i]) {
                decodedSearch = decodedSearch + " " + decodeURIComponent(segments[i]);
            }
        }
        return decodedSearch.substr(1);
    }
    
    private encodeSearch(search: string): string {
        if(!search) {
            return "";
        }
        let segments: string[] = search.split(" ");
        let encodedSearch: string = "";
        for(let i = 0; i < segments.length; i++) {
            if(segments[i]) {
                encodedSearch = encodedSearch + "+" + encodeURIComponent(segments[i]);
            }
        }
        return encodedSearch.substr(1);
    }
}
