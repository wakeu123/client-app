import { TableModule } from "primeng/table";
import { UserFascade } from "./user.fascade";
import { ReactiveFormsModule } from "@angular/forms";
import { ChangeDetectionStrategy, Component, inject} from "@angular/core";

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [ReactiveFormsModule, TableModule],
    template: `
    <form class="row" [formGroup]="fascade.filters">
        <input type="text" formControlName="name" placeholder="Name">
        <input type="text" formControlName="username" placeholder="username">
        <input type="text" formControlName="email" placeholder="email">
        <button (click)="fascade.refres()">Refresh users</button>
    </form>

    <p-table [value]="fascade.users() ?? []" tyleClass="p-datatable-striped" [tableStyle]="{ 'min-width': '50rem' }">
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
    `,
    providers: [UserFascade],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListUserComponent {

    public fascade = inject(UserFascade);
}
