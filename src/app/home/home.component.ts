import { Component, OnInit } from '@angular/core';
import { Escort } from '../common/models/escort';
import { Photo } from '../common/models/photo';
import { EscortService } from '../escort.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
myImage:string ="assets/my.jpeg";
escorts:Array<Escort>;
nombreEscorts:number;
pageEscort:number=1;
  constructor(public escortService: EscortService) { }

  ngOnInit(): void {
    this.escorts = [];
    this.escortService.getAllEscorts().then(
      (data: Array<Escort>) => {
      for(let d of data){

        if(d.pictures!=null){
          for(let pic of d.pictures){
            pic.picture = 'data:image/jpeg;base64,' + pic.picture;
          }
          this.escorts.push(d);
        }
      }
        
      }
    )
  }

}
