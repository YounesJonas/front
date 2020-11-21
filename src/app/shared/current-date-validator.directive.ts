import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
export function compareCurrentDate(controlNameToCompare: string): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value === null || c.value.length === 0) {
      return null; // don't validate empty value
    }

    const controlToCompare = c.root.get(controlNameToCompare);
    
    const currentDate = new Date();
    const date = new Date(c.value);
    return controlToCompare && currentDate > date ? { 'appCurrentDateValidator': true } : null;  
  };
}
@Directive({
  selector: '[appCurrentDateValidator]',
  providers:[{provide:NG_VALIDATORS,useExisting: CurrentDateValidatorDirective, multi:true}]
})
export class CurrentDateValidatorDirective {
  @Input('appEndDateValidator') controlNameToCompare: string;

  validate(c: AbstractControl): ValidationErrors| null {
    if (c.value === null || c.value.length === 0) {
      return null; // don't validate empty value
    }

    const controlToCompare = c.root.get(this.controlNameToCompare);
   
    const currentDate = new Date();
    const date = new Date(c.value);
    
    return controlToCompare && currentDate > date  ? { 'appEndDateValidator': true } : null;
  }

}
