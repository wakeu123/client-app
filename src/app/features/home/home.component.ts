import { Component, OnInit } from '@angular/core';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { UserService } from '../users/user.service';
import { ListUserComponent } from '../users/list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListUserComponent, NgxSpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [UserService]
})
export class HomeComponent implements OnInit {

    ngOnInit(): void {
  
    }
}
