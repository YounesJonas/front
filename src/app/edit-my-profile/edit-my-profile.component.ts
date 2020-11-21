import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ville } from '../common/models/ville';
import { EscortService } from '../escort.service';
import { Escort } from '../common/models/escort';
import { ReturnCodeObject } from '../common/models/returnCodeObject';
import { from } from 'rxjs';

@Component({
  selector: 'app-edit-my-profile',
  templateUrl: './edit-my-profile.component.html',
  styleUrls: ['./edit-my-profile.component.css']
})
export class EditMyProfileComponent implements OnInit {
public escToSave : Escort;
public myEscort: Escort;
public villes: Array<Ville>;
public infoPersoForm: FormGroup;
public detailSexuelForm: FormGroup;
public aProposDeMoiForm: FormGroup;
public coordonneesForm: FormGroup;
public galerieForm: FormGroup;
public mode: string;
public un: string;
public nomPhoto: string;
public selectedFile: File;
  constructor(
    public dialog: MatDialogRef<EditMyProfileComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private dataService: EscortService,
  ) { 
    console.log('debug data ' + this.data);
    
  }

  ngOnInit(): void {
    console.log(this.data.mode=='infoPerso');
    console.log('debug data username ' + this.data.userName);
    this.un = this.data.userName;
    console.log("debug de un "+ this.un);
    // create forms
    this.createForm();
    this.createFormDetailSexuel();
    this.createAproposForm();
    this.createCoordonnesForm();
    this.createGalerieForm();
     // get cities
     this.dataService.getAllcities().then(
      (data:Array<Ville>) =>{
        this.villes = data;
      }
    )
  }

  createForm() {
    this.infoPersoForm = this.fb.group(
      {
        taille: ['',[Validators.required,Validators.min(100),Validators.max(250),Validators.pattern('[0-9]*')]],
        yeux: ['', Validators.required],
        poids: ['', [Validators.required,Validators.min(30),Validators.max(150),Validators.pattern('[0-9]*')]],
        cheveux: ['', Validators.required]
}
    )
  }

  createFormDetailSexuel() {
    this.detailSexuelForm = this.fb.group(
      {
        orientationSexuelle : ['',Validators.required]
      }
    )
  }

  createAproposForm(){
    this.aProposDeMoiForm = this.fb.group(
      {
        aProposDeMoiText : ['',Validators.required]
      }
    )
  }

  createCoordonnesForm(){
    this.coordonneesForm = this.fb.group(
      {
        ville : ['',Validators.required],
        numeroTel : ['',[Validators.required,Validators.pattern('^(00)[0-9]{12}'),Validators.maxLength(14)]],
        siteWeb : ['',Validators.required]
      }
    )
  }

  createGalerieForm(){
    this.galerieForm = this.fb.group(
      {
        photo : ['',Validators.required]
      }
    )
  }

  onSelectFile(event){

  }

  selectFile(){

  }

  sendFile(){
    
  }

  get taille() {
    return this.infoPersoForm.get('taille');
  }

  get yeux(){
    return this.infoPersoForm.get('yeux');
  }

  get cheveux(){
    return this.infoPersoForm.get('cheveux');
  }

  get poids(){
    return this.infoPersoForm.get('poids');
  }

  get orientationSexuelle(){
    return this.detailSexuelForm.get('orientationSexuelle');
  }

  get aProposDeMoiText(){
    return this.aProposDeMoiForm.get('aProposDeMoiText');
  }

  get ville(){
    return this.coordonneesForm.get('ville');
  }

  get numeroTel(){
    return this.coordonneesForm.get('numeroTel');
  }

  get mail(){
    return this.coordonneesForm.get('mail');
  }

  get siteWeb(){
    return this.coordonneesForm.get('siteWeb');
  }
  
  get photo(){
    return this.galerieForm.get('photo');
  }
  
  registerInfoPerso = (event: Event) => {

  }

  save(data){
    console.log('debug data save --');
    console.log(data);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const saveInfoPersoData = new FormData();
    saveInfoPersoData.append('username', this.un);
    saveInfoPersoData.append('taille', this.infoPersoForm.get('taille').value);
    saveInfoPersoData.append('poids', this.infoPersoForm.get('poids').value);
    saveInfoPersoData.append('cheveux', this.infoPersoForm.get('cheveux').value);
    saveInfoPersoData.append('yeux', this.infoPersoForm.get('yeux').value);
    console.log("to send  : " + saveInfoPersoData);
    this.dataService.saveInfoPerso(saveInfoPersoData).subscribe(
      (data:ReturnCodeObject) => {
        console.log(data.returnCode);
        if (data.returnCode === 'OK') {
          
          this.data.userName = this.un;
          this.data.taille = this.infoPersoForm.get('taille').value;
          this.data.poids = this.infoPersoForm.get('poids').value;
          this.data.cheveux = this.infoPersoForm.get('cheveux').value;
          this.data.yeux = this.infoPersoForm.get('yeux').value;
          this.dialog.close({
            dataReturned: this.data
          });
        } else {
          
        }
       
      }
    )
    
    
    ;
  }

  saveDetailsSexuel(data){
    console.log('debug data save details sexuel --');
    console.log(data);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const saveDetailsSexData = new FormData();
    saveDetailsSexData.append('username', this.un);
    saveDetailsSexData.append('orientationSexuelle', this.detailSexuelForm.get('orientationSexuelle').value);

    // call service
    this.dataService.saveOrientationSexuel(saveDetailsSexData).subscribe(
      (data:ReturnCodeObject) => {
        console.log("return code save orientation sexuelle  "+data.returnCode);
        if (data.returnCode === 'OK') {
          
          this.data.userName = this.un;
          this.data.orientationSexuelle = this.detailSexuelForm.get('orientationSexuelle').value;
          this.dialog.close({
            dataReturned: this.data
            
            
          }
          )
          console.log("debug orientation sex " + this.data.orientationSexuelle);;
        } else {
          
        }
       
      }
    );
  }

  saveApropos(data){
    console.log('debug data save a propos de moi --');
    console.log(data);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const aProposData = new FormData();
    aProposData.append('username', this.un);
    aProposData.append('aProposDeMoiText', this.aProposDeMoiForm.get('aProposDeMoiText').value);

    // call service
    this.dataService.saveApropos(aProposData).subscribe(
      (data:ReturnCodeObject) => {
        console.log("return code save a propos de moi   "+data.returnCode);
        if (data.returnCode === 'OK') {
          
          this.data.userName = this.un;
          this.data.aProposDeMoiText = this.aProposDeMoiForm.get('aProposDeMoiText').value;
          this.dialog.close({
            dataReturned: this.data
            
            
          }
          )
          console.log("debug a propos  " + this.data.aProposDeMoiText);;
        } else {
          
        }
       
      }
    );
  }


  saveCoordonnees(data){
    console.log('debug coordonnes');
    console.log(data);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const coordonnesData = new FormData();
    coordonnesData.append('username', this.un);
    coordonnesData.append('ville', this.coordonneesForm.get('ville').value);
    coordonnesData.append('numeroTel', this.coordonneesForm.get('numeroTel').value);
    coordonnesData.append('siteWeb', this.coordonneesForm.get('siteWeb').value);

    // call service
    this.dataService.saveCoordonnees(coordonnesData).subscribe(
      (data:ReturnCodeObject) => {
        console.log("return code save coordonnees  "+data.returnCode);
        if (data.returnCode === 'OK') {
          
          this.data.userName = this.un;
          this.data.ville = this.coordonneesForm.get('ville').value;
          this.data.numeroTel = this.coordonneesForm.get('numeroTel').value;
          this.data.siteWeb = this.coordonneesForm.get('siteWeb').value;
          this.dialog.close({
            dataReturned: this.data
            
            
          }
          )
          console.log("debug coordonnees" + this.data.ville);
        } else {
          
        }
       
      }
    );
  }

  savePicture(data){

    console.log('debug galerie');
    console.log(data);
    for(let p of data.photo){
      console.log("nom de la photo " + p.name);
      this.nomPhoto = p.name;
    }
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const galerieData = new FormData();
    galerieData.append('username', this.un);
    galerieData.append('path',this.nomPhoto);
    galerieData.append('picture',this.selectedFile);

    //call service
    this.dataService.savePicture(galerieData).subscribe(
      (data:ReturnCodeObject) => {
        console.log("return code save galerie  "+ data.returnCode);
        if (data.returnCode === 'OK') {
          console.log("save picture is OK");
          this.dataService.getEscortByUsername(this.un).then(
            (data:Escort) =>{
              console.log(data);
              
              this.myEscort = data;
              console.log("debug photo");
              console.log("pic" + this.myEscort.pictures);
              
              for(let p of this.myEscort.pictures){
                console.log("valeur de l'id " + p.id);
                
                p.picture = 'data:image/jpeg;base64,' + p.picture;
              }
              console.log("total pics " + this.myEscort.pictures.length);
              
              this.data.photos = this.myEscort.pictures;
              console.log("debug data length " + this.data.photos.length);
              
             

              
            }
          )
            
          this.dialog.close({dataReturned: this.data});
          
          
          }
        } 
       
    );


  }

  fillFromFormInfoPer = () => {
    this.escToSave.setFirstname(this.infoPersoForm.value.firstname);
    this.escToSave.setLastname(this.infoPersoForm.value.lastname);
    this.escToSave.setNationalite(this.infoPersoForm.value.nationalite.nationalite);
    this.escToSave.setMail(this.infoPersoForm.value.mail); 

  }

//Gets called when the user selects an image
public onFileChanged(event) {
  console.log(event);
  //Select File
  this.selectedFile = event.target.files[0];
}
}
