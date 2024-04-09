import { InjectionToken } from "@angular/core";

export const DEFAULT_TIMER = new InjectionToken<number>("timer", {
    providedIn: 'root',
    factory: () => 1000
});