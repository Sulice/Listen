import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({ selector: "[hoverEntry]" })
export class HoverEntryDirective {
    constructor(private el: ElementRef) {}

    @HostListener("mouseenter") onMouseEnter() {
        this.scrollLeft();
    }

    @HostListener("mouseleave") onMouseLeave() {
        this.resetScroll();
    }

    private scrollLeft() {
        let e: HTMLElement = this.el.nativeElement;
        let title: HTMLElement = e.querySelector(".title") as HTMLElement;
        let titleText: HTMLElement = e.querySelector(".title").childNodes[0] as HTMLElement;
        if (title && titleText) {
            let moveLength = Math.max(titleText.offsetWidth - title.offsetWidth, 0);
            if (moveLength > 0) moveLength += 50;
            titleText.style.right = moveLength + "px";
        }
    }

    private resetScroll() {
        let e: HTMLElement = this.el.nativeElement;
        let titleText: HTMLElement = e.querySelector(".title").childNodes[0] as HTMLElement;
        if (titleText) {
            titleText.style.right = "0px";
        }
    }
}
