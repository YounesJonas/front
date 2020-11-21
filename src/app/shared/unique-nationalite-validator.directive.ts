import { Directive } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { PaysService } from '../pays.service';
import { Observable } from 'rxjs';
import { NationaliteString } from '../common/models/nationaliteString';
import { map } from 'rxjs/operators';

export function uniqueNationaliteValidator(sharedService: PaysService): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return sharedService.getNationaliteByName(c.value).pipe(
      map ( (n :NationaliteString)  => {
        console.log(n);
        
        return  n.nationalite.length > 0 ? { 'uniqueNationalite' : true} : null;
      }

      )
    )
    

}
}


@Directive({
  selector: '[uniqueNationalite]'
})
export class UniqueNationaliteValidatorDirective  implements AsyncValidator{

  constructor(
    private paysService : PaysService
  ) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return uniqueNationaliteValidator(this.paysService)(c);
  }
}
