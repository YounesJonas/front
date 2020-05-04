import { Directive } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { PaysService } from '../pays.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaysString } from '../common/models/paysString';


export function uniquePaysValidator(sharedService: PaysService): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return sharedService.getPaysName(c.value).pipe(
      map ( (pays :PaysString)  => {
        console.log(pays);
        
        return  pays.nomPays.length > 0 ? { 'uniqueePays' : true} : null;
      }

      )
    )
    

}
}

@Directive({
  selector: '[uniqueePays]'
})
export class UniqueePaysValidatorDirective implements AsyncValidator {

  constructor(
    private paysService : PaysService
  ) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return uniquePaysValidator(this.paysService)(c);

}

}
