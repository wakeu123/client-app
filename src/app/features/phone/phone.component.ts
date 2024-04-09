import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { DEFAULT_TIMER } from '@app/data';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [TimerComponent],
  providers:[
    {
      provide: DEFAULT_TIMER,
      useValue: 2000
    }
  ],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.scss'
})
export class PhoneComponent {

}
