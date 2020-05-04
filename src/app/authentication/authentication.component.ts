import { Component, OnInit, Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent implements OnInit {

  form : FormGroup;

  constructor(private authentService: AuthenticationService, 
    private router:Router, 
    private fb:FormBuilder) { 
   
  }

  ngOnInit(): void {
    this.createForm();
  }

  onLogin(data) {
    console.log(data);
    this.authentService.login(data)
      .subscribe(resp => {
        console.log(resp);
        console.log(resp.headers.get('Authorization'));
        let jwt = resp.headers.get('Authorization');
        this.authentService.saveToken(jwt);
        this.router.navigateByUrl("/");
      }, err => {
        console.log(err);
      })
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
