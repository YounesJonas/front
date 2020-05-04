import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { PaysService } from '../pays.service';
import { map } from 'rxjs/operators';
import { CityString } from '../common/models/cityString';


export function uniqueCodePostalValidator(sharedService: PaysService): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return sharedService.getCodePostal(c.value).pipe(
      map ( (city :CityString)  => {
        console.log(city);
        
        return  city.codePostal!=null ? { 'uniqueCodePostal' : true} : null;
      }

      )
    )
    

}
}
@Directive({
  selector: '[uniqueCodePostal]'
})
export class UniqueCodePostalValidatorDirective {

  constructor(
    private paysService : PaysService
  ) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return uniqueCodePostalValidator(this.paysService)(c);
}
}
