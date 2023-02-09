import { AbstractControl, ValidatorFn } from "@angular/forms";

export class CustomValidator {

    static nome(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const firstsChars = control.value !== undefined ? control.value.trim().toLocaleUpperCase().substring(0, 2) : '';
            if (control.value !== undefined && firstsChars === 'RN') {
                return { 'invalid': true };
            }
            return null;
        };
    }

    static data(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            
            if (control.value !== undefined && control.value !== null && control.value.length < 10) {
                return { 'incomplete': true }
            }
            return null;
        };
    }

    static cep(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            
            if (control.value !== undefined && control.value.length < 9) {
                return { 'invalid': true };
            }
            return null;
        };
    }

    static hora(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control.value !== undefined && control.value.length < 5) {
                return { 'incomplete': true }
            }
            return null;
        };
    }

    static cnes(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            
            if (control.value !== undefined && control.value.length < 7) {
                return { 'invalid': true };
            }
            return null;
        };
    }

    static pesoGramas(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control.value !== undefined && Number(control.value) !== 0 && (Number(control.value) < 100 || Number(control.value) > 7000)) {
                return { 'invalid': true };
            }
            return null;
        };
    }

    static valorCentimetros(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control.value !== undefined && control.value && control.value.length < 3) {
                return { 'invalid': true };
            }
            return null;
        };
    }

    static confirmPassword(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            // if (control.value !== undefined && control.value && control.value.length < 3) {
            //     return { 'invalid': true };
            // }
            console.log(control.value)
            return null;
        };
    }
    
}