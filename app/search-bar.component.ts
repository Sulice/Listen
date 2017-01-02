import { Component, EventEmitter, Output, ViewChild, Input } from "@angular/core";
import { SearchService } from "./search.service";
import { File } from "./File";
import { Observable } from "rxjs/Observable";

@Component({
    selector: "search-bar",
    templateUrl: "search-bar.component.html"
})
export class SearchBarComponent {
    @Output() onFoundFiles = new EventEmitter<File[]>();
    @Input() query: string;
    mode: string = "s";

    constructor(private searchService: SearchService) {}

    selectMode(mode : string): void {
        switch (mode) {
            case "s":
                this.mode = "s";
                //document.querySelector('.search-bar .modeToggle > i').classList.remove("glyphicon-search");
                //document.querySelector('.search-bar .modeToggle > i').classList.add("glyphicon-folder-close");
                document.getElementById('searchInput').removeAttribute("disabled");
                break;
            case "b":
                this.mode = "b";
                //document.querySelector('.search-bar .modeToggle > i').classList.add("glyphicon-search");
                //document.querySelector('.search-bar .modeToggle > i').classList.remove("glyphicon-folder-close");
                document.getElementById('searchInput').setAttribute("disabled","true");
                break;
            default:
                console.log("unknown mode");
                break;
        }
    }

    alternateMode(): void {
        if(this.mode == "s") {
            this.selectMode("b");
            this.browse("");
            this.query = "/";
        } else {
            this.selectMode("s");
            this.search("");
            this.query = "";
        }
    }
    
    browse(s: string) {
        if (s !== undefined && s !== "" && s !== null) {
            this.query = s;
            s = encodeURIComponent(s.replace(/\s+/gi," "));
        } else {
            this.query = "";
            s = "";
        }
        history.replaceState({}, "", window.location.href.replace(/#.*/, "") + "#/b/" + s);
        this.searchService.browse(s).subscribe(
            r => {
                let e:any = document.querySelector('.search-bar')
                e.style.top = "0";
                this.onFoundFiles.emit(r);
            },
            error => console.log(error)
        );
    }

    search(s: string) {
        if (s !== undefined && s !== "" && s !== null) {
            s = encodeURIComponent(s.replace(/\s+/gi," "));
        } else {
            s = "";
        }
        history.replaceState({}, "", window.location.href.replace(/#.*/, "") + "#/s/" + s);
        if (s.length < 1) {
            let e:any = document.querySelector('.search-bar')
            e.style.top = "50%";
            this.onFoundFiles.emit([]);
            return;
        }
        this.searchService.search(s).subscribe(
            r => {
                let e:any = document.querySelector('.search-bar')
                e.style.top = "0";
                this.onFoundFiles.emit(r);
            },
            error => console.log(error)
        );
    }
}
