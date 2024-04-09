import { Directive, HostBinding, HostListener, Input, OnInit, input } from "@angular/core";

@Directive({
    selector: 'p[highlight]',
    standalone: true
})
export class HighlightDirective implements OnInit {

    @Input('background-color')
    backgroundColor = 'yellow';

    @Input('base-color')
    purple = 'transparent';

    ngOnInit(): void {
        this.color = this.purple;
    }

    @HostBinding('style.backgroundColor')
    color: string = 'transparent';

    @HostListener('mouseenter')
    onMouseEnter() {
        this.color = this.backgroundColor;
    }

    @HostListener('mouseout')
    onMouseOut() {
        this.color = 'transparent';
    }
}