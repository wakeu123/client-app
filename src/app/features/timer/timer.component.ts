import { Component, OnInit, inject } from '@angular/core';
import { TimerrComponent } from './timer2.component';
import { DEFAULT_TIMER } from '@app/data';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [TimerrComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit {
  
  timer = inject(DEFAULT_TIMER);

  ngOnInit(): void {
    console.log(`Default timer is ${this.timer}`);
  }
}
