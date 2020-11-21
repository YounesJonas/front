import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from './common/models/user';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
public host: string = "http://localhost:8091";
jwt:string;
userName:string;
expirationTime;
expired:boolean;
roles:Array<string>;
private user: BehaviorSubject<User>;
public currentUser: Observable<User>;
  constructor(
    private http:HttpClient,
    private router:Router
    
    ) { 
    this.user = new BehaviorSubject(new User());
    this.currentUser = this.user.asObservable();
  }

  setUser = (user: User) => {
    this.user.next(user);
}

getCurrentUser = (): User => {
    return this.user.value;
}
  login(data){

    return this.http.post(this.host+"/login",data, {observe:'response'})
  }


  onlogin(data){
    console.log(data);
    return this.http.post(this.host+"/login",data, {observe:'response'})
      .subscribe(resp => {
        console.log(resp);
        console.log(resp.headers.get('Authorization'));
        let jwt = resp.headers.get('Authorization');
        this.saveToken(jwt);
        this.router.navigateByUrl("/aboutUs");
      }, err => {
        console.log(err);
        
      })
  }

  saveToken(jwt:string){
    localStorage.setItem('tocken',jwt);
    this.jwt=jwt;
    this.parseJwt();

  }

  parseJwt(){
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt);
    this.userName = objJWT.sub;
    this.roles = objJWT.roles;
    this.expirationTime = objJWT.exp;
    let d = new Date(); 
    const unixtime = d.valueOf();
    console.log(unixtime);
    if(unixtime>(this.expirationTime*1000)){
        this.expired = true;
    }else{
      this.expired = false;
    }

    console.log("date d expiration "+this.expirationTime);
    console.log("date actuelle "+unixtime);
    console.log("tocken est expiré " + this.expired);
    
    console.log(this.userName);
    console.log(this.roles)
    
  }


  isAdmin(){
    return this.roles.indexOf('ADMIN')>=0;
  }

  isUser(){
    return this.roles.indexOf('USER')>=0;
  }

  isClientCheck(){
    return this.roles.indexOf('CLIENT')>=0;
  }

  isAuthenticated(){
    return this.roles && (this.isAdmin || this.isUser);
  }

  isAuthenticated2  = (): boolean => {
    if(this.roles && (this.isAdmin || this.isUser) && !this.isTockenExpired()){
      return true;
    }else{
      return false;
    }
  }

  isClient =(): boolean => {
    console.log("les roles " + JSON.stringify(this.roles));
    
    if(this.roles && (this.isClientCheck()) && !this.isTockenExpired()){
      console.log("is client " + this.isClientCheck());
      
      return true;
    }else{
      return false;
    }
  }

  isTockenExpired(){
    let d = new Date(); 
    const unixtime = d.valueOf();
    console.log(unixtime);
    if(unixtime>(this.expirationTime*1000)){
        this.expired = true;
    }else{
      this.expired = false;
    }
    return this.expired;
  }


getConnectedUser(){
  this.jwt = localStorage.getItem('tocken');
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
  return this.http.get(this.host+'/getConnectedUser', { headers : tocken });
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
  deleteJWT(){

    localStorage.removeItem('tocken');
    this.jwt = undefined;
    this.userName = undefined;
    this.roles = undefined;
    console.log(localStorage.getItem('tocken'));
   
  
  
  }
}
