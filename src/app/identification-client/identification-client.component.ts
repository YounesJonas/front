import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-identification-client',
  templateUrl: './identification-client.component.html',
  styleUrls: ['./identification-client.component.css']
})
export class IdentificationClientComponent implements OnInit {
appointmentNumber: number;
  constructor(public router : Router,
              public route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.appointmentNumber = this.route.snapshot.params.id;
    console.log("id appointments " + this.appointmentNumber);
  }

  login(){
    this.router.navigateByUrl("/loginClient/"+this.appointmentNumber);
  }

  signUp(){
    console.log("go to sign up for this reservation " + this.appointmentNumber);
    this.router.navigateByUrl("/registerClient/"+this.appointmentNumber);
    
  }
}
