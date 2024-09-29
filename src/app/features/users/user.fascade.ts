import { DestroyRef, inject, Injectable, OnDestroy } from "@angular/core";
import { UserService } from "./user.service";
import { BehaviorSubject, combineLatest, debounceTime, map, startWith, switchMap } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { User } from "@app/core/models/user.model";

@Injectable()
export class UserFascade implements OnDestroy {
    private _userService = inject(UserService);
    private _destroyed = inject(DestroyRef);

    private readonly reload$$ = new BehaviorSubject<void>(void 0);
    filters = inject(FormBuilder).nonNullable.group({ name: [''], username: [''], email: [''] });

    private users$ = this.reload$$.pipe(takeUntilDestroyed(this._destroyed), switchMap(() => this._userService.load()));
    private search$ = this.filters.valueChanges.pipe(debounceTime(300), startWith(this.filters.getRawValue()));

    

    users = toSignal<User[]>(combineLatest({ 
        users: this.users$, 
        filters: this.search$
    }).pipe(
        map(({ users, filters }) => users.filter(user => this.userMatcher(user, filters)))
    ));

    refres(): void {
        this.reload$$.next();
    }

    userMatcher(user: User, filters: any): boolean {
        const { name, username, email } = filters;
        const nameMatching = user.name.toLowerCase().startsWith(name.toLowerCase());
        const emailMatching = user.email.toLowerCase().includes(email.toLowerCase());
        const usernameMatching = user.username.toLowerCase().startsWith(username.toLowerCase());
        return nameMatching && emailMatching && usernameMatching;
    }

    ngOnDestroy(): void {
        console.log("Fascade user is destroy.");
    }
}