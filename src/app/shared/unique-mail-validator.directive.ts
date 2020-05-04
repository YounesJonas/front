import { Directive } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { EscortService } from '../escort.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReturnCodeObject } from '../common/models/returnCodeObject';


export function uniqueMailValidator(sharedService: EscortService): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return sharedService.getMailFromEscort(c.value).pipe(
      map (
        
        (projects:ReturnCodeObject)=> {
        console.log(projects);
        
        return  projects.returnCode.length > 0 ? { 'uniqueMail' : true} : null;
      }

      )
    )
    

}
}


@Directive({
  selector: '[uniqueMail]'
})
export class UniqueMailValidatorDirective  implements AsyncValidator{

  constructor(
    private dataService : EscortService
  ) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return uniqueMailValidator(this.dataService)(c);

}
}
