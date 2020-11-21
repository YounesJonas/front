import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditMyProfileComponent } from '../edit-my-profile/edit-my-profile.component';
import { AuthenticationService } from '../authentication.service';
import { Escort } from '../common/models/escort';
import { ActivatedRoute, Router } from '@angular/router';
import { EscortService } from '../escort.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { title } from 'process';
import { event } from '../common/models/event';
import { NewEventComponent } from '../new-event/new-event.component';
import { EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  totalPictures:number;
  pagePicture:number=1;
  authentifie:boolean;
  isAdmin:boolean;
  jwt: string;
  roles:Array<string>;
  myEscort: Escort;
  username;
  authenticatedUsername;
  theSame:boolean;
  evenements: Array<event> =  new Array();
  posts =[];
  utl:any;
  calendarOptions: CalendarOptions;
 
  
  //full calendar specified , static : true is obligatory
  @ViewChild("fullcalendar", { static: true })
  calendarComponent: FullCalendarComponent;
  constructor(
    public dialog : MatDialog,
    public authenticationService: AuthenticationService,
    public escortService: EscortService,
    route: ActivatedRoute,
    private router:Router
  ) { 
     
   
    const na = Calendar.name;
    console.log('debug routers');
    
    console.log(route.snapshot.params.userName);
    this.username = route.snapshot.params.userName;
    console.log('value of username '+this.username);
    
  }

  
  ngOnInit(): void {
   
  console.log("username in request " + this.username);
  this.utl = "http://localhost:8090/disponibilites/"+this.username;
  this.escortService.getEvents(this.username).subscribe(
    (data) => {
      //console.log("initilalement nbr events "+ Object.keys(data).length);
      //console.log(" events "+ JSON.stringify(data));
      for(let i = 0; i <= Object.keys(data).length; i++){
          const e = new event;
          if(data[i]!=undefined){
          this.posts.push(
            
            {
              title: data[i].title,
              start: data[i].start,
              end: data[i].end,
              color: data[i].color
            }
            
          );
         
          
          }
      }
      //console.log("initilament evenements from db " + JSON.stringify(this.evenements));
      //this.posts.push(JSON.stringify(this.evenements));
      console.log(" tableau " + this.posts);
      console.log(" tableau " + JSON.stringify(this.posts));
      
      
    }
  )
 
  this.calendarOptions = {
    initialView: 'timeGridDay',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    locale: 'fr',
    events: this.utl,
     headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right:'addEventButton'
    },
    buttonText: {
      today: 'auj.',
      week: 'sem.',
      day: 'jour'
    },
   
     nowIndicator:true,
    customButtons: {
      addEventButton: {
        text: 'nv crénau',
        click: () =>{
          const dialogEvent = this.dialog.open(NewEventComponent,{
            data : {
              username : this.username
        
            }
          });
          dialogEvent.afterClosed().subscribe(
            result => {
              console.log("logging after saving event ....");
              if(result.dataReturned==="OK"){
              location.replace('/myProfile/'+this.authenticatedUsername);
              }
              
              
              }
        
              
      
          )
  
  
  
        }
      }
    },
    
  
  };
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
        this.totalPictures = this.myEscort.pictures.length;
        for(let p of this.myEscort.pictures){
          console.log("valeur de l'id " + p.id);
          
          p.picture = 'data:image/jpeg;base64,' + p.picture;
        }
        
        
      }
    )
  }

  isAuthenticated = (): boolean =>{
    return this.authenticationService.isAuthenticated2();
    }

    getEscortByUsername = (username:string): Escort =>{
      return null;
    }
modify(m,name){
 const dialogRef = this.dialog.open(EditMyProfileComponent,{
    data : {
      mode: m,
      userName:name,
      taille:null,
      poids:null,
      cheveux:null,
      yeux:null,
      orientationSexuelle:null,
      aProposDeMoiText:null,
      ville:null,
      numeroTel:null,
      siteWeb:null,
      photos:null

    }
  });

  dialogRef.afterClosed().subscribe(
    result => {
      
      if(result.dataReturned.poids!=null &&  result.dataReturned.taille!=null && result.dataReturned.cheveux!=null && result.dataReturned.yeux!=null){
        console.log("info perso modified ");
        this.myEscort.poids = result.dataReturned.poids;
      this.myEscort.taille = result.dataReturned.taille;
      this.myEscort.cheveux = result.dataReturned.cheveux;
      this.myEscort.yeux = result.dataReturned.yeux;
      }

      if(result.dataReturned.orientationSexuelle!=null){
        console.log("orientation sexuelle modified " + result.dataReturned.orientationSexuelle);
        
        this.myEscort.orientationSexuelle=result.dataReturned.orientationSexuelle;
      }

      if(result.dataReturned.aProposDeMoiText!=null){
        console.log("a propos de moi modified " + result.dataReturned.aProposDeMoiText);
        
        this.myEscort.aProposDeMoi=result.dataReturned.aProposDeMoiText;
      }

      if(result.dataReturned.ville!=null &&  result.dataReturned.numeroTel!=null && result.dataReturned.siteWeb!=null){
        console.log("coordonnees modified ");
      this.myEscort.nomVille = result.dataReturned.ville;
      this.myEscort.numeroTel = result.dataReturned.numeroTel;
      this.myEscort.siteUrl = result.dataReturned.siteWeb;
    
      }

      
        console.log("picture from data base");
        this.escortService.getEscortByUsername(this.username).then(
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
  )
}


  
onDeletePicture(id){
  let co = confirm("Etes-vous sur de vouloir supprimer ce pays ?");
  if(!co){
    return;
  }else{
    this.escortService.deletePicForEscort(id)
    .subscribe(
      data => {
        this.escortService.getEscortByUsername(this.username).then(
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
    )
  }
}
 
  

 reload(){
   console.log("redirect to authenticated user profile ...");
   
  location.replace('/myProfile/'+this.authenticatedUsername);
 }



 

handleDateClick(arg) {
  alert('date click! ' + arg.dateStr)
}


onEventClick(){
console.log("im here ...");

}
}
