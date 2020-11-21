import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../authentication.service';
import { Client } from '../common/models/client';
import { Request } from '../common/models/request';
import { EscortService } from '../escort.service';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {
pageEvent: number=1;
totalEvents:number;
totalRequests:number;
requests: Array<Request>;
authenticatedUsername;
jwt: string;
username: string;
myClient: Client;
urlInsta: string;
urlFace: string;
isClient: boolean;
isSame: boolean;
  constructor(
    public authenticationService: AuthenticationService,
    public escortService: EscortService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    
    
    console.log(this.route.snapshot.params.username);
    this.username = this.route.snapshot.params.username;
    // check if client connected
    this.isClient = this.isAuthenticated();
    if(this.isClient){
      this.jwt = localStorage.getItem('tocken');
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt);
    this.authenticatedUsername = objJWT.sub;
    if(this.authenticatedUsername==this.username){
        this.isSame =true;
    }else{
         this.isSame=false;
    }
     
    }
    //get Client
    this.escortService.getClientByUsername(this.username).then(
      (data:Client) =>{
        console.log(data);
        
        this.myClient = data;
        console.log("debug photo");
        console.log("pic" + this.myClient.picture);
        this.myClient.picture.picture = 'data:image/jpeg;base64,' + this.myClient.picture.picture;
        
        
        
      }
    )
    this.urlInsta = "https://www.instagram.com/"+this.username;
    console.log("url instagram " + this.urlInsta);
    this.urlFace = "https://www.facebook.com/"+this.username;

    // get requests for client
    console.log("sent to back with username " + this.username);
    
    this.escortService.getRequestForClient(this.username).subscribe(
      (data:any) =>{
       this.requests = data;
       for(let i=0 ; i<data.lenght ;)
       console.log("les request " + JSON.stringify(data));
       
       this.totalEvents = this.requests.length;
       for(let request of this.requests){
        request.photo = 'data:image/jpeg;base64,' + request.photo;
        console.log("status  of request " + request.id + " est " + request.status);
        console.log("is expired " + request.status === "expiree");
        
        if(request.status === "expiree"){
          request.status ="Expirée";
          
        }

        let dateToCheck = new Date(request.startDate);
        let nowDate = new Date();
        if(request.status === "acceptee" && dateToCheck<nowDate){
          request.status ="Acceptée - Expirée";
          
        }
        

       
       
       }
       
      }
    )
  }

  instaUser(username){
    window.location.href = '/https://www.instagram.com/'+this.username;
  }
  isAuthenticated = (): boolean =>{
    return this.authenticationService.isClient();
    }

    reload(){
      console.log("redirect to authenticated client profile ...");
      
     location.replace('/client/'+this.authenticatedUsername);
    }
    step = 0;
    setStep(index: number) {
      this.step = index;
    }
    payer(id){
      console.log("payment " + id);
      
    }
}
