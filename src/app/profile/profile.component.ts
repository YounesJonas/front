import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { AuthenticationService } from '../authentication.service';

import { Escort } from '../common/models/escort';
import { EscortService } from '../escort.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isEscort: boolean;
  username;
  myEscort: Escort;
  pagePicture:number=1;
  totalPictures:number;
  utl:any;
  calendarOptions: CalendarOptions;
  //full calendar specified , static : true is obligatory
  @ViewChild("fullcalendar", { static: true })
  calendarComponent: FullCalendarComponent;
  constructor(
    public authenticationService: AuthenticationService,
    public escortService: EscortService,
    route: ActivatedRoute) {
      
    console.log(route.snapshot.params.userName);
    this.username = route.snapshot.params.userName;
    console.log('value of username '+this.username);

   }

  ngOnInit(): void {

    console.log("username in request " + this.username);
  this.utl = "http://localhost:8090/disponibilites/"+this.username;
  

  this.calendarOptions = {
    initialView: 'timeGridDay',
    locale: 'fr',
    events: this.utl,
     headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right:'today'
    },
    buttonText: {
      today: 'auj.',
      week: 'sem.',
      day: 'jour'
    },
   
     nowIndicator:true,
     eventClick: function(info){
  
       
       console.log("color " + info.event.backgroundColor);
       if(info.event.backgroundColor!="green"){
         alert('vous ne pouvez pas réserver ce crénau !');
         return;
       }
       
      let co = confirm("voulez-vous vraiment faire une réservation ?");
  if(!co){
    return;
  }
location.replace("appointments/"+info.event.id);
  
 


     },
     validRange: {
       start: new Date
     }
    
    
  
  };

     // get Escort by username
     this.escortService.getEscByUser(this.username).then(
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
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
    
  }

  isAuthenticated = (): boolean =>{
    return this.authenticationService.isAuthenticated2();
    }
  
}
