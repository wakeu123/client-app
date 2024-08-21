import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "@app/core/models/user.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
    private _http = inject(HttpClient);

    load(): Observable<User[]> {
        return this._http.get<User[]>("https://jsonplaceholder.typicode.com/users");
    }
}