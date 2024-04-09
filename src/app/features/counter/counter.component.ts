import { ChangeDetectionStrategy, Component, model, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {

  counter = model(0);
  isDesc = signal(true);

  onIncrement(): void {
    this.counter.update((val) => val + 1);
    if(this.counter() >= 1) {
      this.isDesc.set(false);
    }
  }

  onDecrement() {
    this.counter.update((val) => val - 1);
    if(this.counter() === 0) {
      this.isDesc.set(true);
    }
  }
}
