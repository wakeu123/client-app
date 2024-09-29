import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { differenceInYears } from "date-fns";

export function isAdultValidator(): ValidatorFn {
    return ((control: AbstractControl): Nullable<ValidationErrors> => {
        if(!control.value) return null;
        const toDay: Date = new Date();
        const birthDate: Date = new Date(control.value);
        const isAdult: boolean = differenceInYears(toDay, birthDate) >= 18;
        return isAdult ? null : { isUnderAge: true }
    });
}