import { Component, EventEmitter, Output, ViewChild }           from "@angular/core";
import { SearchService }                                        from "./search.service";
import { Track }                                                from "./Track";
import { Observable }                                           from "rxjs/Observable";
import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS }                  from "ng2-bootstrap/ng2-bootstrap";
import { ModalDirective }                                       from "ng2-bootstrap/components/modal";

@Component({
    selector: "search-bar",
    template: `
        <div class="search-bar">
            <div class="input-group">
                <div (click)="smModal.show()" class="input-group-addon"><i class="glyphicon glyphicon-music"></i></div>
                <input autocomplete="off" placeholder="search for songs" (keyup)="search(searchInput.value)" type="text" class="form-control" #searchInput/>

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
    `,
    directives: [MODAL_DIRECTIVES, ModalDirective],
    viewProviders: [BS_VIEW_PROVIDERS]
})
export class SearchBarComponent {
    @Output() onFoundTracks = new EventEmitter<Track[]>();
    @ViewChild("childModal") public childModal: ModalDirective;

    public showChildModal(): void {
        this.childModal.show();
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }

    constructor(public searchService: SearchService) {}

    search(s: string) {
        if (s.length < 1) {
            return;
        }
        this.searchService.search(s).subscribe(
            r => this.onFoundTracks.emit(r),
            error => console.log("e:" + error)
        );
    }
}
