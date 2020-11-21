import { Component, OnInit, Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent implements OnInit {

  form : FormGroup;
  message: string;
  admin:boolean;
  webToken: string;
  roles:Array<string>;

  constructor(private authentService: AuthenticationService, 
    private router:Router, 
    private fb:FormBuilder) 
    { 
   
  }

  ngOnInit(): void {
    this.createForm();
    this.message='';
  }

  onLogin(data) {
    console.log(data);
    this.authentService.login(data)
      .subscribe(resp => {
        console.log(resp);
        console.log(resp.headers.get('Authorization'));
        let jwt = resp.headers.get('Authorization');
        this.authentService.saveToken(jwt);
        // check if user is Admin
        this.webToken = localStorage.getItem('tocken');
        let jwtHelper = new JwtHelperService();
         let objJWT = jwtHelper.decodeToken(this.webToken);
        this.roles = objJWT.roles;
        if(this.roles.includes("ADMIN")){
          console.log("Info " + JSON.stringify(objJWT));
         
            this.router.navigateByUrl("/adminPays");
          
          
        }
        if(this.roles.includes("USER") && !this.roles.includes("ADMIN") ){
        this.router.navigateByUrl("/myProfile/" + data.userName);
        }
        if(this.roles.includes("CLIENT")){
          this.router.navigateByUrl("/client/" + data.userName);
          }
      }, err => {
        console.log(err);
        this.message='nom utilisateur ou mot de passe incorrect!'; 
        this.form.get('password').setValue("");
        console.log(this.message);
      })
  }


  login(data){
    this.authentService.onlogin(data);
  }



hideToolBar(){
  
}
isAdmin(){
  return this.authentService.isAdmin();
}

isUser(){
  return this.authentService.isUser();
}

get userName() {
  return this.form.get('userName');
}
get password() {
  return this.form.get('password');
}

createForm() {
  this.form = this.fb.group(
    {
      userName: ['',
        Validators.required],

        
      password: ['',
        [Validators.required,Validators.minLength(6)]]



    }
  )
}


}
