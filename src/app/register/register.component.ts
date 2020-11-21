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
import { Nationalite } from '../common/models/Nationalite';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';


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
public nationalites: Array<Nationalite>;
public bsConfig: Partial<BsDatepickerConfig>;
public colorTheme = 'theme-dark-blue';
public locale: string;
public maxDate: Date;
public yearMax: number;

  constructor(
    private fb: FormBuilder,
    private dataService: EscortService,
    private localeService: BsLocaleService
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
      // get nationalites
      this.dataService.getAllNationalites().then(
       (data: Array<Nationalite> ) =>{
         this.nationalites = data;
       }
      )

      this.bsConfig = Object.assign({}, {
         containerClass: this.colorTheme,
         showWeekNumbers: false,
         dateInputFormat: 'DD/MM/YYYY'
      
      });
      this.locale = 'fr';
      this.localeService.use(this.locale);
      this.maxDate = new Date();
      console.log("la date actuelle " + this.maxDate);
      console.log(" value of full year " + this.maxDate.getFullYear());
      this.yearMax = (this.maxDate.getFullYear()) - 18;
      console.log("year max " + this.yearMax);
      
      this.maxDate.setFullYear(this.yearMax);

      console.log("la date max authorisee " + this.maxDate);
     
     
      
      
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
          
        
        mail: [null, [Validators.required, Validators.email],
          uniqueMailValidator(this.dataService)
         
        ],
        dateNaissance: ['',
          Validators.required],
        ville: ['',
          Validators.required],
        nationalite: [
          '',
          Validators.required
        ],
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
  get mail() {
    return this.registerForm.get('mail');
  }

  get ville(){
    return this.registerForm.get('ville');
  }

  get sexe(){
    return this.registerForm.get('sexe');
  }

  get nationalite(){
    return this.registerForm.get('nationalite');
  }

  get dateNaissance(){
    return this.registerForm.get('dateNaissance');
  }

  register = (event: Event) => {
    console.log(event);
    event.preventDefault();
    this.fillEscortFromForm();
    console.log("debug escort " + this.escort.mail);
    
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
    this.escort.setNationalite(this.registerForm.value.nationalite.nationalite);
    this.escort.setMail(this.registerForm.value.mail);
    this.escort.setNomVille(this.registerForm.value.ville.nomVille);
    this.escort.setSexe(this.registerForm.value.sexe);
    this.escort.setPassword(this.registerForm.value.password); 
    //debug 
    console.log("debug mail " + this.registerForm.value.mail);
    
    this.escort.setDateDeNaissance(this.registerForm.value.dateNaissance);
  }

  

}
