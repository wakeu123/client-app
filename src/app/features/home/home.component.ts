import { Component, inject } from '@angular/core';
import { UserService } from '../users/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ListUserComponent } from '../users/list.component';
import { User } from '@app/core/models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListUserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [UserService]
})
export class HomeComponent {

    private _userService = inject(UserService);

    //users = toSignal(this._userService.load());
}
