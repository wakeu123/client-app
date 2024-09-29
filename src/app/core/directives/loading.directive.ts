import { DestroyRef, Directive, ElementRef, HostListener, inject, model, OnInit, Renderer2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Directive({
  selector: '[appLoading]',
  standalone: true,
})
export class LoadingDirective implements OnInit {

  private _renderer = inject(Renderer2);

  load: boolean = false;
  time$ = interval(10);
  translate$ = interval(450);
  ref = inject(DestroyRef);

  container = model<ElementRef<HTMLDivElement>>();
  loadCount = model<ElementRef<HTMLSpanElement>>();
  loading_progres = model<ElementRef<HTMLDivElement>>();

  ngOnInit(): void {

      if(this.loadCount() != null && this.loadCount() != undefined) {
        this.time$.pipe(takeUntilDestroyed(this.ref)).subscribe(value => {
          if(value < 101) {
            this._renderer.setProperty(this.loadCount()?.nativeElement, 'textContent', value);
          }
        });
      }

      if(this.loading_progres() != null && this.loading_progres() != undefined) {
        this.time$.pipe(takeUntilDestroyed(this.ref)).subscribe(count => {
          if(count < 101) {
            this._renderer.setStyle(this.loading_progres()?.nativeElement, 'width', (count).toString().concat('%'));
          }
          if(count == 100) {
            this.load = true;
          }
        });
      }

      if(this.load) {

        if(this.container() != null && this.container() != undefined) {
          this._renderer.setStyle(this.container()?.nativeElement, 'opacity', 0);
        this.translate$.pipe(takeUntilDestroyed(this.ref)).subscribe( count => {
          this._renderer.setStyle(this.container()?.nativeElement, 'display', 'none');
        });
      }
      }
  }

  @HostListener('load')
  onLoad() {
    this.load = true;
    console.log('Charger....');
  }

}