import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {

  form : FormGroup;
  message: string;
  admin:boolean;
  webToken: string;
  roles:Array<string>;
  appointmentNumber: number;

  constructor(private authentService: AuthenticationService, 
    private router:Router, 
    private fb:FormBuilder,
    private route:ActivatedRoute
    ) 
    { 
   
  }

  ngOnInit(): void {
    this.appointmentNumber = this.route.snapshot.params.id;
    console.log("id appointments " + this.appointmentNumber);
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
        // check if user is Client
        this.webToken = localStorage.getItem('tocken');
        let jwtHelper = new JwtHelperService();
         let objJWT = jwtHelper.decodeToken(this.webToken);
        this.roles = objJWT.roles;
        if(this.roles.includes("CLIENT")){
          this.router.navigateByUrl("/confirmation/"+data.userName+"/"+this.appointmentNumber);
        }else{
          this.message='nom utilisateur ou mot de passe incorrect!'; 
          this.form.get('password').setValue("");
          console.log(this.message);
          this.authentService.deleteJWT();
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
