import { Directive, HostListener, Input } from "@angular/core";

@Directive({
    selector: 'a[confirm]',
    standalone: true
})
export class ConfirmDirective {

    @Input('confirm-message')
    confirmMessage = 'Etes-vous sûre de vouloir aller sur ce site ?';

    @HostListener('click', ['$event'])
    onMouseOut(e: Event) {
        return window.confirm(this.confirmMessage) ? true : e.preventDefault();
    }
}