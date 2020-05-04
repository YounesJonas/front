import { Directive } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { CityString } from '../common/models/cityString';
import { map } from 'rxjs/operators';
import { PaysService } from '../pays.service';


export function uniqueCityValidator(sharedService: PaysService): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return sharedService.getCityName(c.value).pipe(
      map ( (city :CityString)  => {
        console.log(city);
        
        return  city.nomVille.length > 0 ? { 'uniqueCity' : true} : null;
      }

      )
    )
    

}
}
@Directive({
  selector: '[uniqueCity]'
})
export class UniqueCityValidatorDirective implements AsyncValidator{

  constructor(
    private paysService : PaysService
  ) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return uniqueCityValidator(this.paysService)(c);

}

}
