import { Component, inject } from "@angular/core";
import { DEFAULT_TIMER } from "@app/data";
import { interval } from "rxjs";
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'timer',
    standalone: true,
    template: `Timer running: {{ timer() }}`
})
export class TimerrComponent {
    timer = toSignal(interval(inject(DEFAULT_TIMER)))
}