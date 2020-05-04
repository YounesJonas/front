import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EscortService } from '../escort.service';
import { ConfirmationEmail } from '../common/models/confirmationEmail';
import { ReturnCodeObject } from '../common/models/returnCodeObject';

@Component({
  selector: 'app-validation-inscription',
  templateUrl: './validation-inscription.component.html',
  styleUrls: ['./validation-inscription.component.css']
})
export class ValidationInscriptionComponent implements OnInit {

  public validationForm: FormGroup;
  public confirmation: ConfirmationEmail;
  public message: string;
  public validationReussite: boolean;

  constructor(
    private fb: FormBuilder,
    private dataService: EscortService
  ) { }

  ngOnInit(): void {
    this.validationReussite = false;
    this.message="";
    this.confirmation = new ConfirmationEmail();
    this.createForm();
  }
  createForm() {
    this.validationForm = this.fb.group(
      {
       email: ['',
          [Validators.required, Validators.email]],
       codeConfirmation: [null,[
          Validators.required,Validators.pattern("^[0-9]*$"),
          Validators.minLength(6), Validators.maxLength(6)]
       ]
          
      }
    )
  }
  get email() {
    return this.validationForm.get('email');
  }

  get codeConfirmation(){
return this.validationForm.get('codeConfirmation');
  }

validateEmail = (event: Event) => {

  event.preventDefault();
  this.confirmation.setEmail(this.validationForm.value.email);
  this.confirmation.setCodeConfirmation(this.validationForm.value.codeConfirmation);
  // call API service to validate mail

  this.dataService.validateEmail(this.confirmation).subscribe(
    (data: ReturnCodeObject) => {
      console.log(data.returnCode);
      if(data.returnCode==="OK"){
        this.message = "Félicitation votre compte est désormais activé!";
        this.validationReussite = true;
      }
      if(data.returnCode==="KO"){
        this.message= "code de confirmation est erroné";
        this.validationReussite = false;
      }
    },(err) =>{
      this.message = "une erreur est survenue lors de la validation! Essayez plus tard"
    }



  )

}


messageToEmpty(){
  this.message="";
}


}
