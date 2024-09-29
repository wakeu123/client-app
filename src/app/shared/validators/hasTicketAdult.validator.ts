import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function hasAdultTicket(): ValidatorFn {
    return ((group: AbstractControl): Nullable<ValidationErrors> => {
        const { adultTicketCount, childTicketCount } = group.value;
        const hasChildTicketOnly = !adultTicketCount && childTicketCount;
        return hasChildTicketOnly ?  { childTicketOnly: true } : null;
    });
}