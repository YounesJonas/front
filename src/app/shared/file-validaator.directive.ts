import { Directive } from '@angular/core';
import { Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[appFileValidaator]'
})
export class FileValidaator implements Validator {

  static validate(c: FormControl): {[key: string]: any} {
    return c.value == null || c.value.length == 0 ? { "required" : true} : null;
}

validate(c: FormControl): {[key: string]: any} {
    return FileValidaator.validate(c);
}

}
