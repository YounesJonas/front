import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { EscortService } from '../escort.service';
import { Username } from '../common/models/username';
import { map } from 'rxjs/operators';


export function uniqueUsernameValidator(sharedService: EscortService): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return sharedService.getUsername(c.value).pipe(
      map ((users:Username)   => {
        console.log(users);
        
        return  users.username.length > 0 ? { 'uniqueUsername' : true} : null;
      }

      )
    )
    

}
}

@Directive({
  selector: '[uniqueUsername]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueUsernameValidatorDirective, multi: true }]

})
export class UniqueUsernameValidatorDirective implements AsyncValidator {

  constructor(
    private sharedService: EscortService
  ) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return uniqueUsernameValidator(this.sharedService)(c);
}
}
