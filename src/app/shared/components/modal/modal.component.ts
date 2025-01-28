import { Component, input, model, OnDestroy, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'base-modal',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit, OnDestroy{
  
  title = input<string>('title');
  showModal = model.required<boolean>();


  ngOnInit(): void {
      
  }

  onHide(): void {
    this.showModal.set(false);
    this.ngOnDestroy();
  }

  ngOnDestroy(): void {
      console.log('Modal is destroy...');
  }
}
