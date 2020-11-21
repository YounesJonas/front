import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pays } from '../common/models/pays';
import { PaysService } from '../pays.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarServiceService } from '../shared/navbar-service.service';
import { AuthenticationService } from '../authentication.service';
import { uniquePaysValidator } from '../shared/uniquee-pays-validator.directive';
import { FileValidaator } from '../shared/file-validaator.directive';
import { uniqueCityValidator } from '../shared/unique-city-validator.directive';
import { uniqueCodePostalValidator } from '../shared/unique-code-postal-validator.directive';
import { PaysString } from '../common/models/paysString';
import { CityString } from '../common/models/cityString';
import { NationaliteString } from '../common/models/nationaliteString';
import { uniqueNationaliteValidator } from '../shared/unique-nationalite-validator.directive';

@Component({
  selector: 'app-admin-nationalite',
  templateUrl: './admin-nationalite.component.html',
  styleUrls: ['./admin-nationalite.component.css']
})
export class AdminNationaliteComponent implements OnInit {

  public uploadForm: FormGroup;
  public updateForm: FormGroup;
 
  authentifie:boolean;
  jwt;
  pays;
  nationalites;
  villes;
  photo;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  mode='list';
  currentCountry: string;
  currentNationalite: string;
  currentNationaliteId: Number;
  currentCity: string;
  currentCodePostalCity: string;
  currentCityId: number;
  currentId: number;
  selectedId;
  selectedNationaliteId;
  selectedCountry: Pays;
  totalCountry: number;
  pageCountry:number=1;
  totalNationalite:number;
  pageNationalite:number=1;
  totalCity: number;
  pageCity:number=1;
    constructor(private paysService:PaysService,private route:ActivatedRoute,private router:Router
      , private fb: FormBuilder,
      public navService: NavbarServiceService,
      public authenticationService: AuthenticationService
      ) { }
  
    ngOnInit(): void {
      this.jwt = localStorage.getItem('tocken');
      console.log(this.jwt);
      
      this.authentifie = this.isAuthenticated();
      console.log("authentifie"+this.authentifie);
      
      this.navService.show();
  
      this.uploadForm = this.fb.group(
        {
          nationalite: ['', Validators.required,uniqueNationaliteValidator(this.paysService)]
        }
      )
  
      this.updateForm = this.fb.group(
        {
          nationaliteUpdate: ['', Validators.required,uniqueNationaliteValidator(this.paysService)]
        }
      )
  
     
        this.paysService.getAllNationalities().subscribe(
          data => {
            console.log("list nationalite debugging");
            console.log(data);
            this.nationalites = data;
            console.log(this.nationalites._embedded.nationaliteList);
            this.totalNationalite=this.nationalites._embedded.nationaliteList.length;
            console.log(this.totalNationalite);
          },err=>{
            console.log(err);
          }
          
          )
  
      
    }
  
  
  
  

  onDeleteNationalite(id){
    let co = confirm("Etes-vous sur de vouloir supprimer cette nationalité ?");
    if(!co){
      return;
    }
    this.paysService.deleteNationalite(id)
    .subscribe(data=>
      {
        this.getAllNationalites();
        this.selectedNationaliteId=null;
      },err=>{
        console.log(err);
      })
  }

  
  
  onEditNationalite(nom,id){
  
    this.mode='edit-mode';
    this.currentNationalite = nom;
    this.currentNationaliteId = id;
  }


  
 

  getAllNationalites(){
    this.paysService.getAllNationalities().subscribe(
      data => {
        console.log("list nationalite debugging");
        console.log(data);
        this.nationalites = data;
        console.log(this.nationalites._embedded.nationaliteList);
        this.totalNationalite=this.nationalites._embedded.nationaliteList.length;
        console.log(this.totalNationalite);
      },err=>{
        console.log(err);
      }
      
      )
  }
  
  
 saveNationalite(data){
     //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
     const addNationaliteData = new FormData();
     addNationaliteData.append('nationalite', this.uploadForm.get('nationalite').value);
     // rest call
     this.paysService.addNationalite(addNationaliteData)
     .subscribe(
      (data:NationaliteString) => {
        console.log(data.nationalite);
        if (data.nationalite === 'OK') {
          this.message = 'Nationalité ajoutée avec succès!';
        } else {
          this.message = 'erreur produite, Réessayez plus tard!';
        }
        this.mode='list';
        this.uploadForm.get('nationalite').setValue('');
        this.getAllNationalites();
      }
        );
  }
  





  addCountry(){
    this.mode = 'new-country';
  }
  

  get nationalite(){
    return this.uploadForm.get('nationalite');
  }

  get nationaliteUpdate(){
    return this.updateForm.get('nationaliteUpdate');
  }
  
  putNationalite(id){
// FormData To send it in Post request
const uploadUpdateNationalite = new FormData();
uploadUpdateNationalite.append('id',id);
uploadUpdateNationalite.append('nationalite',this.updateForm.get('nationaliteUpdate').value);
// call service
this.paysService.putNationalite(uploadUpdateNationalite).subscribe(

  (data: NationaliteString) => {
    console.log(data.nationalite);
        if (data.nationalite === 'OK') {
          this.message = 'modification de nationalité réalisée avec succès!';
          
        } else {
          this.message = 'erreur lors de la modification de nationalité!';
        }
        
        this.mode='list';
        this.updateForm.get('nationaliteUpdate').setValue('');
        this.getAllNationalites();
      },err=>{
        console.log(err);
      }
  
)
  }
  
 
  putCountry(data,id){
    console.log(data);
    console.log(id);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile);
    uploadImageData.append('nomPays', this.updateForm.get('nomPaysUpdate').value);
    uploadImageData.append('id', id);
    this.paysService.putCountry(uploadImageData)
    .subscribe(
      (data:PaysString) =>{
        console.log(data.nomPays);
        if (data.nomPays === 'OK') {
          this.message = 'modification de pays réalisée avec succès!';
          
        } else {
          this.message = 'erreur lors de la modification de pays!';
        }
        
        this.mode='list';
        this.updateForm.get('nomPaysUpdate').setValue('');
        this.updateForm.get('fileUpdate').setValue(null);
        this.getAllNationalites();
      },err=>{
        console.log(err);
      }
    )
  }
  

    
  
  selectNationalite(nationalite,id){
    this.mode = 'list';
    console.log("ligne selected");
    console.log(nationalite.id);
    console.log(this.totalNationalite);
    this.selectedNationaliteId = nationalite.id;
    this.message=null;
    console.log("ligne selected");
    this.getAllNationalites();
    

  }

  
 
  
  isAuthenticated = (): boolean =>{
  return this.authenticationService.isAuthenticated2();
  }

}
