import { NgIf } from "@angular/common";
import { Directive, inject, OnInit } from "@angular/core";
import { AuthService } from "@app/shared/services/auth.service";

// Cette directive est apple ainsi dans un template *isAuthenticated

@Directive({
    selector: '[isAuthenticated]',
    standalone: true,
    hostDirectives: [{
        directive: NgIf
    }]
})
export class IsAuthenticatedDirective implements OnInit {

    private ngDirective = inject(NgIf);

    ngOnInit(): void {
        this.ngDirective.ngIf = inject(AuthService).isAuthenticated;        
    }
}
