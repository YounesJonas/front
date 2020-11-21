import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReturnCodeObject } from '../common/models/returnCodeObject';
import { EscortService } from '../escort.service';
import { map } from 'rxjs/operators';

export function uniqueMailClientValidator(sharedService: EscortService): AsyncValidatorFn {

  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return sharedService.getMailFromClient(c.value).pipe(
      map (
        
        (projects:ReturnCodeObject)=> {
        console.log(projects);
        
        return  projects.returnCode.length > 0 ? { 'uniqueMailClient' : true} : null;
      }

      )
    )
    

}
}

@Directive({
  selector: '[uniqueMailClient]'
})
export class UniqueMailClientValidatorDirective implements AsyncValidator {

  constructor(
    private dataService : EscortService
  ) { }
  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
   return uniqueMailClientValidator(this.dataService)(c);
  }
 

}
