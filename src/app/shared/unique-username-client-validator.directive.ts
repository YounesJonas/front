import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Username } from '../common/models/username';
import { EscortService } from '../escort.service';

export function uniqueUsernameClientValidator(sharedService: EscortService): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return sharedService.checkUsernameClient(c.value).pipe(
      map ((users:Username)   => {
        console.log(users);
        
        return  users.username.length > 0 ? { 'usernameClient' : true} : null;
      }

      )
    )
}
}
@Directive({
  selector: '[usernameClient]'
})
export class UniqueUsernameClientValidatorDirective implements AsyncValidator{

  constructor(
    private sharedService: EscortService
  ) { }
  validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
    return uniqueUsernameClientValidator(this.sharedService)(control);
  }

}
