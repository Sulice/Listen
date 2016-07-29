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
    template: `
        <div class="search-bar">
            <div class="input-group">
                <div (click)="smModal.show()" class="input-group-addon"><i class="glyphicon glyphicon-music"></i></div>
                <input
                    id="searchInput"
                    autocomplete="off"
                    placeholder="search for songs"
                    (keyup)="search(searchInput.value)"
                    type="text"
                    class="form-control"
                    [value]="query"
                    #searchInput
                />
            </div>
        </div>
<!-- Small modal -->
<div bsModal #smModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" aria-label="Close" (click)="smModal.hide()">
                <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">Listen</h4>
            </div>
            <div class="modal-body">
                Made by Niels Robin-Aubertin.<br>
                You can visit the github project <a href="https://github.com/Sulice/listen">here</a>.
            </div>
        </div>
    </div>
</div>
<!-- Alerts -->
<div class="alert-box">
    <alert *ngFor="let alert of alerts;let i = index" [type]="alert.type" [dismissible]="true" [dismissOnTimeout]="alert.timeout" (close)="closeAlert(i)">
      {{ alert?.msg }}
    </alert>
</div>
    `,
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
            return;
        }
        this.searchService.search(s).subscribe(
            r => this.onFoundTracks.emit(r),
            error => this.addAlert(error, "danger", 60000)
        );
    }
}
