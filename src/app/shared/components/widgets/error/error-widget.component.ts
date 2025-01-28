import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'mat-error',
    standalone: true,
    template: `
    <div class="error">
        <ng-content />        
    </div>
    `,
    imports: [CommonModule],
    styleUrls: ['./error-widget.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorWidgetComponent {

}