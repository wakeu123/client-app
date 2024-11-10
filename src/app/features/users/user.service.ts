import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "@app/core/models/user.model";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
    private _http = inject(HttpClient);
    private _spinner  = inject(NgxSpinnerService); 

    load(): Observable<User[]> {
        return this._http.get<User[]>("https://jsonplaceholder.typicode.com/users").pipe(
            tap(() => this._spinner.hide())
        );
    }
}