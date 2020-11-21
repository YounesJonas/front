import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Username } from '../common/models/username';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
 
  authentifie:boolean;
  admin:boolean;
  isClient:boolean;
  hide:boolean;
  username: any;
  jwt: string;
  roles:Array<string>;
  
  constructor(private authentService: AuthenticationService,private router:Router) { 
   
  }
  ngOnInit(): void {
    this.authentifie=false;
    this.admin=false;
    this.hide=false;
    this.isClient=false;
    
    this.authentService.getConnectedUser().subscribe(
      (data: Username) =>{
        console.log(data.username);
        
this.username = data.username;
this.authentifie = true;
console.log("valeur de boolean authentifie");
console.log(this.authentifie);

this.jwt = localStorage.getItem('tocken');
let jwtHelper = new JwtHelperService();
let objJWT = jwtHelper.decodeToken(this.jwt);
this.roles = objJWT.roles;
if(this.roles.includes("ADMIN")){
  this.admin = true;
  console.log("admin " + this.admin);
  
}
if(this.roles.includes("CLIENT")){
  this.isClient = true;
  console.log("CLIENT " + this.isClient);
  
}


      },err =>{
        console.log(err);
        this.authentifie = false;
        console.log("user authenticated " + this.authentifie);
        
        
      }
    )
    


    
 
  }
  



  logout(){
    this.authentifie = false;
    return this.authentService.logout();
  }
  hideBar(){
this.hide=true;
  }

  editMyprofile(){
    this.router.navigateByUrl("myProfile/"+this.username);
  }

  editClientProfile(){
    this.router.navigateByUrl("client/"+this.username);
  }

  goToAdminPage(){
    this.router.navigateByUrl("adminPays");
  }
  goProfiles(){
    this.router.navigateByUrl("profiles");
  }
  goDisponibilites(){
    this.router.navigateByUrl("myProfile/"+this.username+"/demandes");
  }


}
