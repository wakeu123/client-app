import { Component, ElementRef, viewChild } from '@angular/core';
import { LoadingDirective } from '@app/core/directives/loading.directive';

@Component({
  selector: 'app-progres',
  standalone: true,
  imports: [LoadingDirective],
  templateUrl: './progres.component.html',
  styleUrl: './progres.component.scss'
})
export class ProgresComponent {

  container = viewChild<ElementRef<HTMLDivElement>>('loadingRef');
  loadCount = viewChild<ElementRef<HTMLSpanElement>>('loadCountRef');
  loading_progres = viewChild<ElementRef<HTMLDivElement>>('progresBarRef');
}
