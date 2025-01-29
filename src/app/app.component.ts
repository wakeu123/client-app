import { formatDate, isPlatformBrowser, JsonPipe, KeyValue, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { format, formatDistance, subDays } from 'date-fns';
import { Router, RouterOutlet } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { convertToBase64 } from './shared/utils/convert-file-in-base64';
import { convertDateToString, onExportJson } from './shared/utils';
import { catchError, map, merge, of, Subject, tap } from 'rxjs';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatInTimeZone } from 'date-fns-tz';
import { InputWidgetComponent } from "./shared/components/widgets/input/input-widget.component";
import { ErrorWidgetComponent } from "./shared/components/widgets/error/error-widget.component";

export type Currence = 'USD' | 'EUR' | 'GBP';

export type ExchangeRate = Record<Currence, number>;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    ReactiveFormsModule,
    CalendarModule,
    AngularSplitModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  testForm!: FormGroup;
  addProduct$$ = new Subject<any>();
  EditProduct$$ = new Subject<any>();

  resetSubjects(): void {
    this.addProduct$$ = new Subject<any>();
    this.EditProduct$$ = new Subject<any>();
  }

  combine$ = merge(this.addProduct$$, this.EditProduct$$).pipe(
    catchError((error) => {
      console.log('Error merge: ', error);
      this.resetSubjects();
      return of(null);
    })
  );

  combineSubscription = this.combine$.subscribe({
    next: (value) => {
      if(value != null) console.log('Combine: ', value);
    },
    error: (error) => {
      console.log('Error combine: ', error);
    },
    complete: () => {
      console.log('Complete combine');
    }
  });

  onExport() {
    onExportJson();
  }

  constructor(@Inject(PLATFORM_ID) private platformID: object, private fb: FormBuilder) {}

  title = 'client-app';
  nbr: number | null = null;
  locale: string = inject(LOCALE_ID);
  now = new Date();
  nowFormatted: string | null = null;
  showMore = signal(false);
  selectedDate!: string;

   productDetails = new Map<string, string>([
    ['name', 'Laptop'],
    ['brand', 'Dell'],
    ['price', '$1200'],
  ]);

  private _route = inject(Router);

  ngOnInit(): void {
    this.testForm = this.fb.nonNullable.group({
      age: new FormControl<number>(450),
      name: new FormControl('', [Validators.required]),
      startDate: new FormControl(formatDate(this.now, 'dd/MM/yyyy', this.locale))
    });
    this.selectedDate = convertDateToString(new Date());
    console.warn('Browser: ', isPlatformBrowser(this.platformID));
    this.go();
    console.log(this.nbr);
    console.log('Date now: ', this.now);
    console.log(format(new Date(), "'Today is 'eeee"));
    console.log(formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true }));
    console.log('Locale: ', this.locale);
    this.nowFormatted = formatDate(this.now, 'dd/MM/yyyy', this.locale);
    console.log(this.nowFormatted);

    const count = signal(1);
    // Signals are getter functions - calling them reads their value.
    console.log('The count is: ' + count());
    count.update(value => value + 2);
    console.log('The count is: ' + count());
    console.log(this.productDetails.entries().next())

    // Emission d'une erreur par un subject
    let mySubject = new Subject<number>();

    mySubject.subscribe({
      next: (v) => console.log('Next: ', v),
      error: (e) => console.log('Error: ', e),
      complete: () => console.log('Completed')
    })

    mySubject.next(23);
    mySubject.error('Erreur detectee');
    mySubject = new Subject<number>();
    mySubject.subscribe(value => console.log('Next apres l\'erreur: ', value));
    mySubject.next(45);


    this.addProduct$$.next({ type: 'add', product: { id: 1, name: 'Laptop', brand: 'Dell', price: '$1200' } });
    this.addProduct$$.error('Erreur detectee lors de l\'ajout du produit');
    this.addProduct$$.next({ type: 'add', product: { id: 2, name: 'Laptop 2', brand: 'Dell 2', price: '$1250' } });
  }

  onShowFormValue(): void {
    console.log('Form value: ', this.testForm?.getRawValue());
  }

  onShowSelectedDate(event: any): void {

    // Formatage de la date au format dd/MM/yyyy
    const formattedDate = convertDateToString(event);
    console.log('Date sélectionnée:', formattedDate);

  }

  onChange(data: Event): void {
    const files = (data.target as HTMLInputElement).files;
    const file = files![0];
    convertToBase64(file).then((value) => console.log(value));
  }

  onAddToMap():  void {
    if(!this.productDetails.has('Fruit')){
      this.productDetails.set('Fruit', 'Mangue');
    }
  }

  go() {
    //const exchanges: KeyValue<Currence, number> = { EUR: 1.25 }
    const rates: ExchangeRate = { EUR: 1.25, USD: 2.54, GBP: 3.24 };
    this.nbr = rates.USD;
    //this.productDetails.forEach((r) => console.log(r));
    //this.productDetails.set('price', '23000000FCFA');
    console.log('*************************')
    this.productDetails.forEach((v, k) => console.log(k, ':', v));
    //this.productDetails.entries().next().value;
  }

  alert() {
    console.log('Click in bouttom');
    let array: any[] = Array.from(this.productDetails);
  }

  keepLeft: boolean = true;

  show = signal<boolean>(true);

  onClick = (): void => {

  }

  gotoVideo = (): void => {
    this._route.navigate(['video', { replace: true }]);
  }

  gotoPhone = (): void => {
    this._route.navigate(['phone']);
  }
  
}
