import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
public host: string = "http://localhost:8091";
jwt:string;
userName:string;
roles:Array<string>;
  constructor(private http:HttpClient,private router:Router) { }


  login(data){

    return this.http.post(this.host+"/login",data, {observe:'response'})
  }

  saveToken(jwt:string){
    localStorage.setItem('tocken',jwt);
    this.jwt=jwt;
    this.parseJwt();

  }

  parseJwt(){
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt);
    this.userName = objJWT.obj;
    this.roles = objJWT.roles;
  }


  isAdmin(){
    return this.roles.indexOf('ADMIN')>=0;
  }

  isUser(){
    return this.roles.indexOf('USER')>=0;
  }

  isAuthenticated(){
    return this.roles && (this.isAdmin || this.isUser);
  }

  loadTocken(){
this.jwt = localStorage.getItem('tocken');
this.parseJwt();
  }


  logout(){

    localStorage.removeItem('tocken');
    this.jwt = undefined;
    this.userName = undefined;
    this.roles = undefined;
    console.log(localStorage.getItem('tocken'));
     this.router.navigateByUrl("/logout");
  
  
  }
}
