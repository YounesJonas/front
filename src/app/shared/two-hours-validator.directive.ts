import { Directive, Input } from '@angular/core';
import {AbstractControl,NG_VALIDATORS,ValidationErrors,Validator, ValidatorFn} from '@angular/forms'
import { Observable, Subscription } from 'rxjs';


export function compareHours(controlNameToCompare: string): ValidatorFn {
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
    const hour = Math.abs(sDate.getTime() - eDate.getTime()) / 36e5 ;
    console.log("valeur de hour " + hour);
    return controlToCompare && hour > 2 ? { 'appTwoHoursValidator': true } : null;  
  };
}



@Directive({
  selector: '[appTwoHoursValidator]',
  providers:[{provide:NG_VALIDATORS,useExisting: TwoHoursValidatorDirective, multi:true}]
})
export class TwoHoursValidatorDirective {

  @Input('appTwoHoursValidator') controlNameToCompare: string;
 
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
    
    const hours = Math.abs(sDate.getTime()- eDate.getTime()) / 36e5;
    console.log("valeur de hour " + hours);
    
    return controlToCompare && hours > 2  ? { 'appTwoHoursValidator': true } : null;
  }
  
    
    

}
