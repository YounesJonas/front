import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { uniqueUsernameValidator } from '../shared/unique-username-validator.directive';
import { EscortService } from '../escort.service';
import { compareValidator } from '../shared/compare-validator.directive';
import { Ville } from '../common/models/ville';
import { CityString } from '../common/models/cityString';
import { Escort } from '../common/models/escort';
import { ReturnCodeObject } from '../common/models/returnCodeObject';
import { uniqueMailValidator } from '../shared/unique-mail-validator.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
public registerForm: FormGroup;
public villes: Array<Ville>;
public escort: Escort;
public message: string;
public inscriptionReussite: boolean;

  constructor(
    private fb: FormBuilder,
    private dataService: EscortService
  ) { 
    
  }

  ngOnInit(): void {
    this.inscriptionReussite = false;
    this.escort = new Escort();
    this.createForm();
    // get cities
    this.dataService.getAllcities().then(
      (data:Array<Ville>) =>{
        this.villes = data;
      }
    )
  }


  createForm() {
    this.registerForm = this.fb.group(
      {
        username: ['',
          Validators.required, uniqueUsernameValidator(this.dataService)],

        firstname: ['',
          Validators.required],
          sexe: ['',
          Validators.required],
        lastname: ['',
          Validators.required],
        
        email: [null, [Validators.required, Validators.email],
          uniqueMailValidator(this.dataService)
         
        ],
        ville: ['',
          Validators.required],
          
        password: ['',
          Validators.required],
        password2: ['',
          [Validators.required, compareValidator('password')]]



      }
    )
  }


  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get password2() {
    return this.registerForm.get('password2');
  }
  get firstname() {
    return this.registerForm.get('firstname');
  }
  get lastname() {
    return this.registerForm.get('lastname');
  }
  get email() {
    return this.registerForm.get('email');
  }

  get ville(){
    return this.registerForm.get('ville');
  }

  get sexe(){
    return this.registerForm.get('sexe');
  }

  register = (event: Event) => {
    console.log(event);
    event.preventDefault();
    this.fillEscortFromForm();
    this.dataService.register(this.escort).subscribe(
      (data: ReturnCodeObject) => {
        console.log(data.returnCode);
        if(data.returnCode==="OK"){
          this.message = "inscription effectuée avec succès!";
          this.inscriptionReussite = true;
        }
        if(data.returnCode==="KO"){
          this.message= "erreur lors de l'inscription!";
          this.inscriptionReussite = false;
        }
      },(err) =>{
        this.message = "une erreur est survenue lors de l'inscription! Essayez plus tard"
      }
    )
  }

fillEscortFromForm = () => {
    this.escort.setFirstname(this.registerForm.value.firstname);
    this.escort.setUsername(this.registerForm.value.username);
    this.escort.setLastname(this.registerForm.value.lastname);
    this.escort.setEmail(this.registerForm.value.email);
    this.escort.setNomVille(this.registerForm.value.ville.nomVille);
    this.escort.setSexe(this.registerForm.value.sexe);
    this.escort.setPassword(this.registerForm.value.password); 
  }

  

}
