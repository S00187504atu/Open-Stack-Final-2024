import { AbstractControl, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(passwordControlName: string, confirmPasswordControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const passwordControl = control.get(passwordControlName);
        const confirmPasswordControl = control.get(confirmPasswordControlName);

        if (!passwordControl || !confirmPasswordControl) {
            return null;
        }

        return passwordControl.value === confirmPasswordControl.value ? null : { 'passwordMismatch': true };
    };
}
