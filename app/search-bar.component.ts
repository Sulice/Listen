import { Component, EventEmitter, Output, ViewChild, Input } from "@angular/core";
import { SearchService } from "./search.service";
import { Track } from "./Track";
import { Observable } from "rxjs/Observable";
import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS } from "ng2-bootstrap/ng2-bootstrap";
import { AlertComponent } from "ng2-bootstrap/ng2-bootstrap";
import { ModalDirective } from "ng2-bootstrap/components/modal";
import { CORE_DIRECTIVES } from "@angular/common";

@Component({
    selector: "search-bar",
    templateUrl: "app/search-bar.component.html",
    styleUrls: ['app/search-bar.component.css'],
    directives: [MODAL_DIRECTIVES, ModalDirective, AlertComponent, CORE_DIRECTIVES],
    viewProviders: [BS_VIEW_PROVIDERS]
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
