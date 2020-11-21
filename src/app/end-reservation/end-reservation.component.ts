import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../authentication.service';
import { Client } from '../common/models/client';
import { Escort } from '../common/models/escort';
import { Reservation } from '../common/models/Reservation';
import { EscortService } from '../escort.service';

@Component({
  selector: 'app-end-reservation',
  templateUrl: './end-reservation.component.html',
  styleUrls: ['./end-reservation.component.css']
})
export class EndReservationComponent implements OnInit {
  appointmentNumber: number;
  username: string;
  myClient: Client;
  myEscort: Escort;
  reservationInfo: Reservation;
  totalPictures: number;
  isClient: boolean;
  isSame: boolean;
  authenticatedUsername;
  jwt: string; 
  idDemandeReservation: number;
  constructor(
    private route:ActivatedRoute,
    public router:Router,
    public escortService: EscortService,
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.appointmentNumber = this.route.snapshot.params.id;
    console.log("id appointments " + this.appointmentNumber);
    this.username = this.route.snapshot.params.username;
    console.log("username " + this.username);
    this.idDemandeReservation = this.route.snapshot.params.idDemandeReservation;
    console.log("id demande reservation  " + this.idDemandeReservation);
    // check if user is client
    this.isClient = this.isAuthenticated();
    // check if userconnected and username are the same
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
    // get client information
    this.escortService.getClientByUsername(this.username).then(
      (data:Client) =>{
        console.log(data);
        
        this.myClient = data;
        console.log("debug photo");
        console.log("pic" + this.myClient.picture);
        this.myClient.picture.picture = 'data:image/jpeg;base64,' + this.myClient.picture.picture;
        
        
        
      }
    )
    // get escort by id reservation
    // get Escort
    this.escortService.getEscortByReservationId(this.appointmentNumber).then(
      (data:Escort) =>{
        console.log(data);
        
        this.myEscort = data;
        console.log("debug photo");
        console.log("pic" + this.myEscort.pictures);
        console.log("nombre photo " + this.myEscort.pictures.length);
        this.totalPictures = this.myEscort.pictures.length;
        for(let p of this.myEscort.pictures){
          console.log("valeur de l'id " + p.id);
          
          p.picture = 'data:image/jpeg;base64,' + p.picture;
        }
        
        
      }
    )

    // get info reservation
    this.escortService.getReservationInfo(this.appointmentNumber).subscribe(
      (data:Reservation) => {
        console.log("data reservation" + JSON.stringify(data));
        this.reservationInfo = data;
        
        
      }
    )
    

  }

  isAuthenticated = (): boolean =>{
    return this.authenticationService.isClient();
    }
    reload(){
      console.log("continue your confirmation demande reservation ...");
  
     location.replace('/endReservation/'+this.authenticatedUsername+"/"+this.appointmentNumber+"/"+this.idDemandeReservation);
    }
    goAuth(){
      this.router.navigateByUrl("/loginClient/"+this.appointmentNumber);
    }
    terminer(){
      this.router.navigateByUrl("/profiles");
    }
  }


