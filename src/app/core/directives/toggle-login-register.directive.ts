import { Directive, ElementRef, HostListener, Renderer2, inject, model } from '@angular/core';

@Directive({
  selector: 'button[toggle-login-register]',
  standalone: true
})
export class ToggleLoginRegisterDirective {

  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  container = model<ElementRef<HTMLElement>>();

  @HostListener('click', ['$event'])
  public onClick(e: Event) {
    e.preventDefault();
    console.log(this.container());
    if(this.container() && this.container() != undefined) {
      if(this.elementRef.nativeElement.id === 'register') {
        this.renderer.addClass(this.container()?.nativeElement, 'active');
      }
  
      if(this.elementRef.nativeElement.id === 'login') {
        this.renderer.removeClass(this.container()?.nativeElement, 'active');
      }
    }
  }

}
