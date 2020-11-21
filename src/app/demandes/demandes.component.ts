import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../authentication.service';
import { Escort } from '../common/models/escort';
import { Reservation } from '../common/models/Reservation';
import { Request } from '../common/models/request';
import { EscortService } from '../escort.service';
import { MatDialog } from '@angular/material/dialog';
import { DecisionDialogComponent } from '../decision-dialog/decision-dialog.component';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {
  totalEvents:number;
  message:string;
  pageEvent: number=1;
  totalRequests:number;
  pageRequest: number=1;
  events: Array<Reservation>;
  requests: Array<Request>;
  username:string;
  authenticatedUsername;
  theSame:boolean;
  isAdmin:boolean;
  authentifie:boolean;
  myEscort: Escort;
  jwt:string;
  roles:Array<string>;
  constructor(
    public dialog : MatDialog,
    public route: ActivatedRoute,
    public authenticationService: AuthenticationService,
    public escortService: EscortService,
    public router: Router,
    
  ) { }

  ngOnInit(): void {
    console.log('username ' + this.route.snapshot.params.userName);
    
    this.username = this.route.snapshot.params.userName;
    this.theSame=false;
    this.isAdmin=false;
    this.authentifie = this.isAuthenticated();
    // check if user is Admin
    if(this.authentifie){

    this.jwt = localStorage.getItem('tocken');
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt);
    this.authenticatedUsername = objJWT.sub;
    if(this.authenticatedUsername==this.username){
        this.theSame =true;
    }else{
         this.theSame=false;
    }
    console.log("username in request " + this.username);
    console.log("username authenticated " + this.authenticatedUsername);
    console.log("same " + this.theSame);
     this.roles = objJWT.roles;
      if(this.roles.includes("ADMIN")){
  this.isAdmin = true;
  console.log("admin " + this.isAdmin);
  
} 
    }
    // get Escort
    this.escortService.getEscortByUsername(this.username).then(
      (data:Escort) =>{
        console.log(data);
        
        this.myEscort = data;
        console.log("debug photo");
        console.log("pic" + this.myEscort.pictures);
        console.log("nombre photo " + this.myEscort.pictures.length);
        
        for(let p of this.myEscort.pictures){
          console.log("valeur de l'id " + p.id);
          
          p.picture = 'data:image/jpeg;base64,' + p.picture;
        }
        
        
      }
    )

    // get disponibilities 
    this.escortService.getDisponibilitiesEscort(this.username).subscribe(
      (data:any) =>{
        console.log(data);
        console.log("data " + JSON.stringify(data));
        this.events = data;
        console.log("data " + JSON.stringify(this.events));
        this.totalEvents = this.events.length;
        console.log("total events " + this.totalEvents);
      }
    )

    // gets requests for escort
    this.escortService.getRequestsForEscort(this.username).subscribe(
      (data:any) =>{
       this.requests = data;
       this.totalRequests = this.requests.length;
       for(let request of this.requests){
        request.photo = 'data:image/jpeg;base64,' + request.photo;
        let startDate = new Date(request.start);
        console.log("string date " + request.start);
        console.log("date " + request.startDate);
        let nowDate = new Date();
        let dateToCheck = new Date(request.startDate);
        console.log("statut de la demande " + request.id + " est " + request.status);
        
        if( dateToCheck < nowDate && request.status ==="demandee"){
          request.status ="Expirée" 
        }
        if( request.status ==="acceptee"){
          request.status ="Acceptée" 
        }
        if( request.status ==="refusee"){
          request.status ="Refusée" 
        }
       }
       
      }
    )

  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  validate(){
    this.step++;
    this.router.navigateByUrl('identification/');

  }
  isAuthenticated = (): boolean =>{
    return this.authenticationService.isAuthenticated2();
    }
    reload(){
      console.log("redirect to request for authenticated user profile ...");
      
     location.replace('/myProfile/'+this.authenticatedUsername+"/demandes");
    }

    repondre(id){
      console.log("id reservation " + id);
      // open dialog
      const dialogRef = this.dialog.open(DecisionDialogComponent,{
        data : {
          id: id,
          message:null
        }
      }

      );
      dialogRef.afterClosed().subscribe(
        result => {
          this.message = result.dataReturned.message;
          console.log("message recu " +this.message);
          location.reload();
        }
      );
    }
}
