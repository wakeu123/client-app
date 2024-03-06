import { formatDate } from '@angular/common';
import { Component, LOCALE_ID, inject } from '@angular/core';
import { format, formatDistance, subDays } from 'date-fns';
import { User } from './core/models/user.model';
import { ListUserComponent } from './features/users/list.component';
import { HighlightDirective } from './core/directives/highlith.directive';
import { NoOpenDirective } from './core/directives/no-open.directive';
import { ConfirmDirective } from './core/directives/confirm.directive';

export type Currence = 'USD' | 'EUR' | 'GBP';

export type ExchangeRate = Record<Currence, number>;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListUserComponent, HighlightDirective, NoOpenDirective, ConfirmDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client-app';
  nbr: number | null = null;
  locale: string = inject(LOCALE_ID);
  now = new Date();
  nowFormatted: string | null = null;

  ngOnInit(): void {
    this.go();
    console.log(this.nbr);
    console.log(format(new Date(), "'Today is 'eeee"));
    console.log(formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true }));
    console.log(this.locale);
    this.nowFormatted = formatDate(this.now, 'dd/MM/yyyy', this.locale);
    console.log(this.nowFormatted);
  }

  go() {
    const rates: ExchangeRate = { EUR: 1.25, USD: 2.54, GBP: 3.24 };
    this.nbr = rates.USD;
  }

  users: User[] = [
    { id: 1, name: 'Wakeu', lastName: 'Georges', username: 'naruto' },
    { id: 2, name: 'Kounatze', lastName: 'Kelejou', username: 'nirina' },
    { id: 3, name: 'Lebogo', lastName: 'etogo', username: 'octave' },
  ]

  addUser() {
    this.users = [
      ...this.users,
      {
        id: 5,
        name: 'Andy',
        lastName: 'Bernard',
        username: 'andy.bernard',
      }
    ];
    console.log('Current Users', this.users);
  }

  alert() {
    console.log('Click in bouttom');
  }
  
}
