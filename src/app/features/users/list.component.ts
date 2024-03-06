import { Component, HostListener, computed, input, signal } from "@angular/core";
import { User } from "../../core/models/user.model";

@Component({
    selector: 'app-user-list',
    standalone: true,
    template: `
    <input type="text" (input)="updateQuery($event)" placeholder="Start with..." />
    <ul>
        @for (user of filteredUsers(); track user.id) {
            <li> {{ user.name }} - {{ user.username }} </li>
        }
    </ul>
    `,
    imports: []
})
export class ListUserComponent {

    private query = signal<string>('');
    users = input.required<User[]>();

    protected filteredUsers = computed(() => 
    this.users().filter(({ name }) => 
        name.toLowerCase().startsWith(this.query().toLowerCase())
    )
    );

    ngOnInit(): void {
        const test1 = this.users().some((user) => user.name.toLowerCase() === 'wakeu');
        console.log(`Value1 : ${test1}`);
        const test2 = this.users().every((user) => user.name.toLowerCase().startsWith('w'));
        console.log(`Value2 : ${test2}`);

        console.log(this.users().sort((a, b) => a.id - b.id));
        console.log(this.users().sort((a, b) => a.name.localeCompare(b.name)));
        console.log(this.users().reduce((som, cur) => som + cur.id , 0));
    }

    updateQuery(e: Event) {
        this.query.set((e.target as HTMLInputElement).value);
    }

}