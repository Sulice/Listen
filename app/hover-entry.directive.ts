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
        let e: any = this.el.nativeElement;
        let title: any = e.querySelector(".title");
        let textDescription: any = e.querySelector(".text-description");
        if (title && textDescription) {
           let moveLength = Math.max(title.offsetWidth - textDescription.offsetWidth, 0);
           if (moveLength > 0) moveLength += 50;
           title.style.right = moveLength + "px";
        }
    }

    private resetScroll() {
        let e: any = this.el.nativeElement;
        let title: any = e.querySelector(".title");
        if (title) {
           title.style.right = "0px";
        }
    }
}
