import { formatDate } from '@angular/common';
import { Component, LOCALE_ID, inject, signal } from '@angular/core';
import { format, formatDistance, subDays } from 'date-fns';
import { ListUserComponent } from '@features/users/list.component';
import { HighlightDirective } from '@core/directives/highlith.directive';
import { NoOpenDirective } from '@core/directives/no-open.directive';
import { ConfirmDirective } from '@core/directives/confirm.directive';
import { BannerComponent } from '@shared/banner/banner.component';
import { ParentCounterComponent } from '@features/parent-counter/parent-counter.component';
import { LoginComponent } from '@features/login/login.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { ProgresComponent } from "./shared/loading/progres/progres.component";

export type Currence = 'USD' | 'EUR' | 'GBP';

export type ExchangeRate = Record<Currence, number>;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ListUserComponent,
    HighlightDirective,
    NoOpenDirective,
    ParentCounterComponent,
    ConfirmDirective,
    LoginComponent,
    BannerComponent,
    RouterOutlet,
    ProgresComponent,
    RouterLink,
    AngularSplitModule,
    ProgresComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client-app';
  nbr: number | null = null;
  locale: string = inject(LOCALE_ID);
  now = new Date();
  nowFormatted: string | null = null;
  showMore = signal(false);
  private _route = inject(Router);
  ngOnInit(): void {
    this.go();
    console.log(this.nbr);
    console.log(format(new Date(), "'Today is 'eeee"));
    console.log(formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true }));
    console.log(this.locale);
    this.nowFormatted = formatDate(this.now, 'dd/MM/yyyy', this.locale);
    console.log(this.nowFormatted);

    const count = signal(1);
    // Signals are getter functions - calling them reads their value.
    console.log('The count is: ' + count());
    count.update(value => value + 2);
    console.log('The count is: ' + count());
  }

  go() {
    const rates: ExchangeRate = { EUR: 1.25, USD: 2.54, GBP: 3.24 };
    this.nbr = rates.USD;
  }

  alert() {
    console.log('Click in bouttom');
  }

  keepLeft: boolean = true;

  show = signal<boolean>(true);

  onClick = (): void => {

  }

  gotoVideo = (): void => {
    this._route.navigate(['video']);
  }

  gotoPhone = (): void => {
    this._route.navigate(['phone']);
  }
  
}
