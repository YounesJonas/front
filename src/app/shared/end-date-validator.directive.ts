import { Directive, Input } from '@angular/core';
import {AbstractControl,NG_VALIDATORS,ValidationErrors,Validator, ValidatorFn} from '@angular/forms'
import { Observable, Subscription } from 'rxjs';


export function compareValidatorDate(controlNameToCompare: string): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value === null || c.value.length === 0) {
      return null; // don't validate empty value
    }

    const controlToCompare = c.root.get(controlNameToCompare);
    if (controlToCompare) {
      const subscription: Subscription = controlToCompare
        .valueChanges.subscribe(
          () => {
            c.updateValueAndValidity();
            subscription.unsubscribe();
          }
        );
    }
    const sDate = new Date(controlToCompare.value);
    const eDate = new Date(c.value);
    return controlToCompare && sDate > eDate ? { 'appEndDateValidator': true } : null;  
  };
}


@Directive({
  selector: '[appEndDateValidator]',
  providers:[{provide:NG_VALIDATORS,useExisting: EndDateValidatorDirective, multi:true}]
})
export class EndDateValidatorDirective implements Validator {
  @Input('appEndDateValidator') controlNameToCompare: string;
 
  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value === null || c.value.length === 0) {
      return null; // don't validate empty value
    }

    const controlToCompare = c.root.get(this.controlNameToCompare);
    if (controlToCompare) {
      const subscription: Subscription = controlToCompare
        .valueChanges.subscribe(
          () => {
            c.updateValueAndValidity();
            subscription.unsubscribe();
          }
        );
    }
    const sDate = new Date(controlToCompare.value);
    const eDate = new Date(c.value);
    
    return controlToCompare && sDate > eDate  ? { 'compare': true } : null;
  }
  
    
    
  }
  


