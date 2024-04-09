import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
  });

  it('should emit output when state changes', () => {
    let expectedValue: undefined | boolean | unknown;
    fixture.componentRef.setInput('expand', false);

    component.expand.subscribe(value => expectedValue = value);
    fixture.detectChanges();

    const toggleButton = fixture.nativeElement.querySelector('.info-toggle');
    toggleButton.click();
    
    expect(expectedValue).toBe(true);
  });
});


