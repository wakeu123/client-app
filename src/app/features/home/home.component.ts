import { Component, OnInit, signal } from '@angular/core';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { UserService } from '../users/user.service';
import { ListUserComponent } from '../users/list.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ModalComponent } from "../../shared/components/modal/modal.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListUserComponent, NgxSpinnerComponent, ToastModule, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [UserService, MessageService]
})
export class HomeComponent implements OnInit {

  showModal = signal(false);

  constructor(private messageService: MessageService) {}

  show() {
      //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
      this.showModal.set(!this.showModal());
  }

  ngOnInit(): void {

  }
}
