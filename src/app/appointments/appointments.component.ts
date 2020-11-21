import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../authentication.service';
import { Reservation } from '../common/models/Reservation';
import { EscortService } from '../escort.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
isClient:boolean;
idEvent:any;
reservationInfo: Reservation;
jwt: string;
clientUsername:string;
  constructor(
    public authenticationService: AuthenticationService,
    public route: ActivatedRoute,
    public escortService: EscortService,
    public router: Router
  ) { 
    console.log('id event ' + route.snapshot.params.id);
    
    this.idEvent = route.snapshot.params.id;
  }

  ngOnInit(): void {

    // get info of reservation
    this.escortService.getReservationInfo(this.idEvent).subscribe(
      (data:Reservation) => {
        console.log("data " + data);
        this.reservationInfo = data;
        console.log("username " + this.reservationInfo.username)
        
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

    this.isClient = this.isAuthenticated();
    console.log("is Client " + this.isClient);
    
    this.step++;
    if(!this.isClient){
    this.logout();
    this.router.navigateByUrl('identification/'+this.idEvent);
    }else{
      // get username of Client
      this.jwt = localStorage.getItem('tocken');
      let jwtHelper = new JwtHelperService();
      let objJWT = jwtHelper.decodeToken(this.jwt);
    this.clientUsername = objJWT.sub;
    console.log("username of client " + this.clientUsername);
    
      this.router.navigateByUrl("/confirmation/"+this.clientUsername+"/"+this.idEvent);
    }
  }

  isAuthenticated = (): boolean =>{
    return this.authenticationService.isClient();
    }

    logout(){
    
      return this.authenticationService.logout();
    }
}
