import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    http = inject(HttpClient);

    public get(name: string): Observable<string> {
        return this.http.get<string>('');
    }
}