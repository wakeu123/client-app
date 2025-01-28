import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractTableComponent } from './abstract-table.component';

describe('AbstractTableComponent', () => {
  let component: AbstractTableComponent;
  let fixture: ComponentFixture<AbstractTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbstractTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbstractTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
