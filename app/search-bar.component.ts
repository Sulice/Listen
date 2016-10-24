import { Component, EventEmitter, Output, ViewChild, Input } from "@angular/core";
import { SearchService } from "./search.service";
import { Track } from "./Track";
import { Observable } from "rxjs/Observable";
import { ModalDirective, ModalModule, AlertModule } from "ng2-bootstrap";

@Component({
    selector: "search-bar",
    templateUrl: "search-bar.component.html",
    styleUrls: ['search-bar.component.css'],
})
export class SearchBarComponent {
    @Output() onFoundTracks = new EventEmitter<Track[]>();
    @ViewChild("childModal") public childModal: ModalDirective;
    @Input() query: string;

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

    search(s: string) {
        history.replaceState({}, "", window.location.href.replace(/#.*/, "") + "#/" + s);
        if (s.length < 1) {
            let e:any = document.querySelector('.search-bar')
            e.style.top = "50%";
            this.onFoundTracks.emit([]);
            return;
        }
        this.searchService.search(s).subscribe(
            r => {
                let e:any = document.querySelector('.search-bar')
                e.style.top = "0";
                this.onFoundTracks.emit(r);
            },
            error => this.addAlert(error, "danger", 60000)
        );
    }
}
