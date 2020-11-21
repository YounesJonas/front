import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Client } from '../common/models/client';
import { Escort } from '../common/models/escort';
import { Nationalite } from '../common/models/Nationalite';
import { Photo } from '../common/models/photo';
import { ReturnCodeObject } from '../common/models/returnCodeObject';
import { Ville } from '../common/models/ville';
import { EscortService } from '../escort.service';
import { compareValidator } from '../shared/compare-validator.directive';
import { uniqueMailClientValidator } from '../shared/unique-mail-client-validator.directive';

import { uniqueUsernameClientValidator } from '../shared/unique-username-client-validator.directive';


@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {
hide = true;
public registerForm: FormGroup;

appointmentNumber: number;
public message: string;
public inscriptionReussite: boolean;
public nationalites: Array<Nationalite>;
public bsConfig: Partial<BsDatepickerConfig>;
public colorTheme = 'theme-dark-blue';
public locale: string;
public maxDate: Date;
public yearMax: number;
public selectedFile: File;
public namePhoto: string;
public client: Client;
public pic: Photo

  constructor(
    private fb: FormBuilder,
    private dataService: EscortService,
    private localeService: BsLocaleService,
    private route:ActivatedRoute,
    public router : Router
  ) { 
    
  }

  ngOnInit(): void {
    if(this.route.snapshot.params.id!=null){
      this.appointmentNumber = this.route.snapshot.params.id;
      console.log("le numero de reservation " + this.appointmentNumber);
      
    }
    this.inscriptionReussite = false;
    this.client = new Client();
    this.pic = new Photo();
    this.createForm();
    

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
      console.log("form valid " + this.registerForm.invalid)
     
      
     
      
      
  }

 

  createForm() {
    this.registerForm = this.fb.group(
      {
    

        firstname: ['',
          Validators.required],
        lastname: ['',
          Validators.required],
          username: [null,
            [Validators.required, Validators.minLength(5)],
            uniqueUsernameClientValidator(this.dataService)
          ],
        
        mail: [null, [Validators.required, Validators.email],
        uniqueMailClientValidator(this.dataService)
         
        ],
        photo:['',
        Validators.required],
        dateNaissance: ['',
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
  get mail() {
    return this.registerForm.get('mail');
  }

  get dateNaissance(){
    return this.registerForm.get('dateNaissance');
  }

  get photo(){
    return this.registerForm.get('photo');
  }
  register = (event: Event) => {
    console.log("date de naissance " + this.registerForm.value.dateNaissance);
    console.log(event);
    event.preventDefault();
    this.fillEscortFromForm();
    
    console.log("value of object " + JSON.stringify(this.client));
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const registerClientData = new FormData();
    registerClientData.append('username',this.client.getUsername() );
    registerClientData.append('firstname', this.client.getFirstname());
    registerClientData.append('lastname', this.client.getLastname());
    registerClientData.append('dateNaissance', this.registerForm.value.dateNaissance);
    registerClientData.append('mail', this.client.getMail());
    registerClientData.append('password', this.client.getPassword());
    registerClientData.append('name', this.namePhoto);
    registerClientData.append('picture', this.selectedFile);

    this.dataService.registerClient(registerClientData).subscribe(
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
    this.client.setFirstname(this.registerForm.value.firstname);
    this.client.setUsername(this.registerForm.value.username);
    this.client.setLastname(this.registerForm.value.lastname);
    this.client.setMail(this.registerForm.value.mail);
    this.client.setPassword(this.registerForm.value.password); 
    //debug 
    console.log("debug mail " + this.registerForm.value.mail);
    
    this.client.setDateDeNaissance(this.registerForm.value.dateNaissance);
    // photo
    this.pic.setName(this.namePhoto);
    this.pic.setPicture(this.selectedFile);
    this.client.setPicture(this.pic);

  }

  //Gets called when the user selects an image
public onFileChanged(event) {
  console.log(event);
  //Select File
  this.selectedFile = event.target.files[0];
  this.namePhoto = event.target.files[0].name;
}

goReservation(){
  console.log("go reservation");
  this.router.navigateByUrl("/loginClient/"+this.appointmentNumber);
  
}

}
