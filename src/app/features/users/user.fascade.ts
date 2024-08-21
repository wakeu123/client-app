import { DestroyRef, inject, Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { BehaviorSubject, combineLatest, debounceTime, map, startWith, switchMap } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { User } from "@app/core/models/user.model";

@Injectable()
export class UserFascade {
    private _userService = inject(UserService);
    public destroyed!: DestroyRef;

    private readonly reload$$ = new BehaviorSubject<void>(void 0);

    private users$ = this.reload$$.pipe(switchMap(() => this._userService.load()));

    filters = inject(FormBuilder).nonNullable.group({ name: [''], username: [''], email: [''] });

    users = toSignal(combineLatest({ 
        users: this.users$, 
        filters: this.filters.valueChanges.pipe(takeUntilDestroyed(this.destroyed), debounceTime(300), startWith(this.filters.getRawValue())) 
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
}