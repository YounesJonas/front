import { Component, OnInit } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { Draggable } from '@fullcalendar/interaction';
import { AuthenticationService } from '../authentication.service';
import { EscortService } from '../escort.service';
import { event } from '../common/models/event';

@Component({
  selector: 'app-test-draggable',
  templateUrl: './test-draggable.component.html',
  styleUrls: ['./test-draggable.component.css']
})
export class TestDraggableComponent implements OnInit {

  calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions;
  disponibilities: Array<event>;
 
  constructor(
    public authenticationService: AuthenticationService,
    public escortService: EscortService,
  ) { }

  ngOnInit(): void {

    this.escortService.getDisponibilitiesEscort("mkhalifa").subscribe(
      (data:Array<event>) => {
        console.log(JSON.stringify(data));
        this.disponibilities = data;
      }
    )

    var containerEl = document.getElementById('external-events');
    var calendarEl = document.getElementById('calendar');
  var checkbox = document.getElementById('drop-remove');

  new Draggable(containerEl, {
    itemSelector: '.fc-event',
    eventData: function(eventEl) {
      return {
        title: eventEl.innerText 
      };
    }
  });



  this.calendarOptions = {
    initialView: 'timeGridDay',
   
              
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    drop: function(info) {
      // is the "remove after drop" checkbox checked?
     
    }
          
  
  
  
        }
    
  
  }

}
