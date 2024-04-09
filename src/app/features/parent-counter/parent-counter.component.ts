import { Component, effect, viewChild } from '@angular/core';
import { CounterComponent } from '@features/counter/counter.component';

@Component({
  selector: 'app-parent-counter',
  standalone: true,
  imports: [CounterComponent],
  templateUrl: './parent-counter.component.html',
  styleUrl: './parent-counter.component.scss'
})
export class ParentCounterComponent {
  
  parentCounter = 0;
  counter = viewChild(CounterComponent);

  constructor() {
    effect(() => {
      console.log("Component", this.counter())
      console.log("Counter value : ", this.counter()?.counter())
    });
  }
}
