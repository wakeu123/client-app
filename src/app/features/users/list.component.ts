import { ChangeDetectionStrategy, Component, inject} from "@angular/core";
import { AsyncPipe } from "@angular/common";import { ReactiveFormsModule } from "@angular/forms";
import { UserFascade } from "./user.fascade";

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [ReactiveFormsModule, AsyncPipe],
    template: `
    <form class="row" [formGroup]="fascade.filters">
        <input type="text" formControlName="name" placeholder="Name">
        <input type="text" formControlName="username" placeholder="username">
        <input type="text" formControlName="email" placeholder="email">
        <button (click)="fascade.refres()">Refresh users</button>
    </form>
    <ul>
        @for (user of fascade.users(); track user.id) {
            <li> {{ user.name }} - {{ user.username }} - {{ user.email }} </li>
        }
    </ul>
    `,
    providers: [UserFascade],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListUserComponent {

    public fascade = inject(UserFascade);
}
