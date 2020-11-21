import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { event } from '../common/models/event';
import { ReturnCodeObject } from '../common/models/returnCodeObject';
import { EscortService } from '../escort.service';
import { compareCurrentDate } from '../shared/current-date-validator.directive';
import { compareValidatorDate } from '../shared/end-date-validator.directive';
import { compareHours } from '../shared/two-hours-validator.directive';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
public newEventForm:FormGroup;
public eventToSave : event;
public un:string;
public dateMin:any;
public pipe:any;
public ch;
  constructor(
    public dialog: MatDialogRef<NewEventComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private dataService: EscortService
  ) { }

  ngOnInit(): void {
    

    const dateActuelle = new Date();
    
    
    console.log("date actuelle  " + dateActuelle);
    console.log("date actuelle time value  " + dateActuelle.toISOString().substring(0, 16));
    this.dateMin = dateActuelle.toISOString().substring(0, 16);

    console.log("le username associe " + this.data.username);
    this.un = this.data.username;
    
    this.createEventForm();
  }

  createEventForm(){
    this.newEventForm = this.fb.group(
      {
        title: ['',[Validators.required,Validators.min(5)]],
        startDate: ['',[Validators.required,compareCurrentDate('startDate')]],
        endDate: ['',[Validators.required,compareValidatorDate('startDate'),compareHours('startDate'),compareCurrentDate('endDate')]]
      }
    )
  }
  saveEvent(data){

    console.log(data);
    
    const sDate = new Date(data.startDate);
    const eDate = new Date(data.endDate);

    if(sDate > eDate){
      console.log("start date doit etre avant end date");
      
    }else{
      console.log("tout va bien");
       //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const saveEventData = new FormData();
    saveEventData.append('username', this.un);
    saveEventData.append('title', data.title);
    saveEventData.append('startDate', data.startDate);
    saveEventData.append('endDate', data.endDate);
    console.log("to save " + saveEventData);
    this.dataService.saveNewEvent(saveEventData).subscribe(
      (r:ReturnCodeObject) => {
        console.log(r.returnCode);
        if(r.returnCode === 'OK'){
          this.dialog.close({
            dataReturned: "OK"
          });

        }else{
          if(r.returnCode === 'CH'){
            this.ch = "cet évenemt ne peut être créer, il chevaucher avec d'autres!"
            this.newEventForm.get('title').setValue("");
            this.newEventForm.get('startDate').setValue("");
            this.newEventForm.get('endDate').setValue("");
          }
        }
      }
    )
    




      
    }
    const hour = Math.abs(sDate.getTime() - eDate.getTime()) / 36e5;
    console.log("le nombre d heures entre les deux dates " + hour);
    
  }


get title(){
  return this.newEventForm.get('title');
}

get startDate(){
  return this.newEventForm.get('startDate');
}

get endDate(){
  return this.newEventForm.get('endDate');
}
deleteErrorMessage(){
  console.log("change title ...");
  
  if(this.ch!=undefined){
    console.log("set message error ...");
    
    this.ch="";
  }
}

}
