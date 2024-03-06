import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: 'a[no-open]',
    standalone: true
})
export class NoOpenDirective {

    @HostListener('click', ['$event'])
    onMouseOut(e: Event) {
        e.preventDefault();
    }
}