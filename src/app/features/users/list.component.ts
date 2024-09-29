import { ChangeDetectionStrategy, Component, inject} from "@angular/core";
import { AsyncPipe } from "@angular/common";import { ReactiveFormsModule } from "@angular/forms";
import { UserFascade } from "./user.fascade";
import { TableModule } from "primeng/table";
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [ReactiveFormsModule, AsyncPipe, TableModule, SplitButtonModule],
    template: `
    <form class="row" [formGroup]="fascade.filters">
        <input type="text" formControlName="name" placeholder="Name">
        <input type="text" formControlName="username" placeholder="username">
        <input type="text" formControlName="email" placeholder="email">
        <button (click)="fascade.refres()">Refresh users</button>
    </form>

    <p-table [value]="fascade.users() ?? []" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template pTemplate="header">
        <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-user>
        <tr>
            <td>{{ user.name }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
        </tr>
    </ng-template>
    </p-table>
    <hr>
    <p-splitButton />
    `,
    providers: [UserFascade],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListUserComponent {

    public fascade = inject(UserFascade);
}
