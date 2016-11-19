import { Component, EventEmitter, Output, ViewChild, Input } from "@angular/core";
import { SearchService } from "./search.service";
import { File } from "./File";
import { Observable } from "rxjs/Observable";
import { ModalDirective, ModalModule, AlertModule } from "ng2-bootstrap";

@Component({
    selector: "search-bar",
    templateUrl: "search-bar.component.html",
    styleUrls: ['search-bar.component.css'],
})
export class SearchBarComponent {
    @Output() onFoundFiles = new EventEmitter<File[]>();
    @ViewChild("childModal") public childModal: ModalDirective;
    @Input() query: string;
    mode: string = "s";
    path: string = "";

    selectMode(mode : string): void {
        switch (mode) {
            case "s":
                this.mode = "s";
                document.querySelector('.search-bar .modeToggle > i').classList.remove("glyphicon-search");
                document.querySelector('.search-bar .modeToggle > i').classList.add("glyphicon-folder-close");
                document.getElementById('searchInput').removeAttribute("disabled");
                this.path = "";
                break;
            case "b":
                this.mode = "b";
                document.querySelector('.search-bar .modeToggle > i').classList.add("glyphicon-search");
                document.querySelector('.search-bar .modeToggle > i').classList.remove("glyphicon-folder-close");
                document.getElementById('searchInput').setAttribute("disabled","true");
                break;
            default:
                console.log("unknown mode");
                break;
        }
        console.log(this.mode);
    }

    alternateMode(): void {
        if(this.mode == "s") {
            this.selectMode("b");
            this.browse("");
        } else {
            this.selectMode("s");
            this.search("");
        }
    }

    showChildModal(): void {
        this.childModal.show();
    }

    hideChildModal(): void {
        this.childModal.hide();
    }

    closeAlert(i: number): void {
        this.alerts.splice(i, 1);
    }

    addAlert(text: string, alertType: string, time: number): void {
        this.alerts.push({msg: text, type: alertType, timeout: time});
    }
    alerts: Array<Object> = [];

    constructor(public searchService: SearchService) {}
    
    browse(s: string) {
        if (s !== undefined && s !== "" && s !== null) {
            s = encodeURIComponent(s.replace(/\s+/gi," "));
        } else {
            s = "";
        }
        console.log(s);
        history.replaceState({}, "", window.location.href.replace(/#.*/, "") + "#/b/" + s);
        this.searchService.browse(s).subscribe(
            r => {
                console.log(r);
                let e:any = document.querySelector('.search-bar')
                e.style.top = "0";
                this.onFoundFiles.emit(r);
            },
            error => this.addAlert(error, "danger", 60000)
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
            error => this.addAlert(error, "danger", 60000)
        );
    }
}
