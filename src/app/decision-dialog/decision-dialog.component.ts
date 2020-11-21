import { Inject } from '@angular/core';
import { Optional } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReturnCodeObject } from '../common/models/returnCodeObject';
import { EscortService } from '../escort.service';

@Component({
  selector: 'app-decision-dialog',
  templateUrl: './decision-dialog.component.html',
  styleUrls: ['./decision-dialog.component.css']
})
export class DecisionDialogComponent implements OnInit {
  public decisionForm: FormGroup;

  constructor(
    public dialog: MatDialogRef<DecisionDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:any,
    private dataService: EscortService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
    console.log(" valeur de id reservation " + this.data.id);
  }

  createForm() {
    this.decisionForm = this.fb.group(
      {
        decision: ['',Validators.required]
}
    )
  }

  get decision(){
    return this.decisionForm.get('decision');
  }

  saveDate(data){
    console.log("data decision dialog " +  data.decision);
    console.log("id reservation " +  this.data.id);
    console.log("send to back ---- ");
    this.dataService.majDispoReservation(this.data.id,data.decision).subscribe(
      (data:ReturnCodeObject) => {
        console.log(data.returnCode);
        if (data.returnCode === 'OK') {
          
          this.data.message = "Décision prise en compte avec succès";
          
          this.dialog.close({
            dataReturned: this.data
          });
        } else {
          this.data.message = "une erreur interne contactez l'admin";
          
          this.dialog.close({
            dataReturned: this.data.message
          });
        }
       
      }
    )
  }

}
