import { Component, OnInit } from '@angular/core';
import { PaysService } from '../pays.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { uniquePaysValidator } from '../shared/uniquee-pays-validator.directive';
import { PaysString } from '../common/models/paysString';
import { CityString } from '../common/models/cityString';
import { Pays } from '../common/models/pays';
import { FileValidaator } from '../shared/file-validaator.directive';
import { uniqueCityValidator } from '../shared/unique-city-validator.directive';
import { uniqueCodePostalValidator } from '../shared/unique-code-postal-validator.directive';

@Component({
  selector: 'app-admin-pays',
  templateUrl: './admin-pays.component.html',
  styleUrls: ['./admin-pays.component.css']
})
export class AdminPaysComponent implements OnInit {
public uploadForm: FormGroup;
public updateForm: FormGroup;
public cityForm: FormGroup;
public cityUpdateForm: FormGroup;
pays;
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
currentCity: string;
currentCodePostalCity: string;
currentCityId: number;
currentId: number;
selectedId;
selectedCountry: Pays;
totalCountry: number;
pageCountry:number=1;
totalCity: number;
pageCity:number=1;
  constructor(private paysService:PaysService,private route:ActivatedRoute,private router:Router
    , private fb: FormBuilder) { }

  ngOnInit(): void {
    this.uploadForm = this.fb.group(
      {
        nomPays: ['', Validators.required,uniquePaysValidator(this.paysService)],
        file: ['', [FileValidaator.validate]]
      }
    )

    this.updateForm = this.fb.group(
      {
        nomPaysUpdate: ['', Validators.required,uniquePaysValidator(this.paysService)],
        fileUpdate: ['', [Validators.required]]
      }
    )

    this.cityUpdateForm = this.fb.group(
      {
        nomVilleUpdate: ['', Validators.required,uniqueCityValidator(this.paysService)],
        codePostalUpdate: [null, [Validators.required, Validators.pattern("^[0-9]*$"),
        Validators.minLength(5)],
          uniqueCodePostalValidator(this.paysService)
         
        ]
        }
    )

    this.cityForm = this.fb.group(
      {
      nomVille: ['', Validators.required,uniqueCityValidator(this.paysService)],
      codePostal: [null, [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(5)],
        uniqueCodePostalValidator(this.paysService)
       
      ]
      }
    )
      this.paysService.getAllCountries().subscribe(
        data => {
          console.log("lis debugging");
          this.pays=data;
         console.log(this.pays._embedded.paysList);
         this.totalCountry = this.pays._embedded.paysList.length;
         console.log(this.totalCountry);
          for (let p of this.pays._embedded.paysList) {
            console.log(p.id); // 1, "string", false
            // convert array byte to image
             this.getImage(p.id);
             p.iconePays = 'data:image/jpeg;base64,' + p.iconePays;
        }
        },err=>{
          console.log(err);
        }
        
        )

    
  }

 //Gets called when the user clicks on retieve image button to get the image from back end
 getImage(id) {
  //Make a call to Sprinf Boot to get the Image Bytes.
  this.paysService.getImage(id)
    .subscribe(
      res => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.iconePays;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      }
    );
}


onDeleteCountry(id){
  let co = confirm("Etes-vous sur de vouloir supprimer ce pays ?");
  if(!co){
    return;
  }
  this.paysService.delete(id)
  .subscribe(data=>
    {
      this.getAllCountries();
      this.villes=null;
      this.selectedId=null;
    },err=>{
      console.log(err);
    })
}

onEditCountry(nom,id){

  this.mode='edit-mode';
  this.currentCountry = nom;
  this.currentId = id;
}

getAllCountries(){
  console.log("debugging list countries");
  console.log(this.selectedFile);
  this.paysService.getAllCountries()
    .subscribe( data=>
      {
        this.pays=data;
        console.log(this.pays);
        console.log(this.pays._embedded.paysList);
        this.totalCountry=this.pays._embedded.paysList.length;
        console.log(this.totalCountry);
        
        for (let p of this.pays._embedded.paysList) {
          console.log(p.id); // 1, "string", false
          // convert array byte to image
           this.getImage(p.id);
           p.iconePays = 'data:image/jpeg;base64,' + p.iconePays;
      }
      },err =>{
        console.log(err);
      }

      
    )
}


getAllCitiesByIdCountry(){
  console.log("pagination city");
  this.paysService.getCities(this.selectedId)
  .subscribe( data=>
    {
      this.villes=data;
      
      this.totalCity=this.villes.length;
console.log(this.totalCity);

    },err =>{
      console.log(err);
    }

    
  )

}




saveCountry(data){
  console.log(data);
    this.paysService.addCountry(data)
      .subscribe(
      data =>
      {
        console.log(this.villes);
        this.mode='list';
        this.getAllCountries();
      },err=>{
        console.log(err);
      }
    );
    console.log(this.selectedFile);
}

//Gets called when the user selects an image
public onFileChanged(event) {
  console.log(event);
  //Select File
  this.selectedFile = event.target.files[0];
}

//Gets called when the user clicks on submit to upload the image
onUpload(data) {
  console.log("debugging upload");
  console.log(this.selectedFile);
  
  
  //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
  const uploadImageData = new FormData();
  uploadImageData.append('imageFile', this.selectedFile);
  uploadImageData.append('nomPays', this.uploadForm.get('nomPays').value);
 //Make a call to the Spring Boot Application to save the image
  this.paysService.addCountry(uploadImageData)
  .subscribe(
(data:PaysString) => {
  console.log(data.nomPays);
  if (data.nomPays === 'OK') {
    this.message = 'Pays ajouté avec succès!';
  } else {
    this.message = 'erreur lors de téléchargement!';
  }
  this.mode='list';
  this.uploadForm.get('nomPays').setValue('');
  this.uploadForm.get('file').setValue(null);
  this.villes=null;
  this.getAllCountries();
}
  );


}

addCountry(){
  this.mode = 'new-country';
}

addCity(){
  this.mode = 'new-city';
}

get nomPays(){
  return this.uploadForm.get('nomPays');
}

get file(){
  return this.uploadForm.get('file');
}

get nomPaysUpdate(){
  return this.updateForm.get('nomPaysUpdate');
}

get fileUpdate(){
  return this.updateForm.get('fileUpdate');
}

get nomVille() {
  return this.cityForm.get('nomVille');
}

get codePostal() {
  return this.cityForm.get('codePostal');
}

get nomVilleUpdate(){
  return this.cityUpdateForm.get('nomVilleUpdate');
}

get codePostalUpdate(){
  return this.cityUpdateForm.get('codePostalUpdate');
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
      this.getAllCountries();
    },err=>{
      console.log(err);
    }
  )
}

putCity(data,id){
  console.log(data);
  console.log(id);
  //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
  const putData = new FormData();
  putData.append('nomVille', this.cityUpdateForm.get('nomVilleUpdate').value);
  putData.append('codePostal', this.cityUpdateForm.get('codePostalUpdate').value);
  putData.append('id', id);
  this.paysService.putCity(putData)
  .subscribe(
    (data:CityString) =>{
      console.log(data.nomVille);
      if (data.nomVille === 'OK') {
        this.message = 'modification de la ville est réalisée avec succès!';
        
      } else {
        this.message = 'erreur lors de la modification de la ville!';
      }
      
      this.mode='list';
      this.cityUpdateForm.get('nomVilleUpdate').setValue('');
      this.cityUpdateForm.get('nomVilleUpdate').setValue('');
      this.getCities(this.selectedId);
    },err=>{
      console.log(err);
    }
  )
}
  
selectCountry(country,id){
  this.mode = 'list';
  console.log("ligne selected");
  console.log(country.id);
  
  console.log(this.totalCountry);
  this.selectedId = country.id;
  this.message=null;
  this.selectedCountry=country;
  console.log("ligne selected");
  console.log(country.id);
  console.log(this.selectedId);
  this.pageCity=1;
  this.getAllCountries();
  this.getCities(id);
}

getCities(id){
  this.paysService.getCities(id).subscribe( data=>
    {
     
      this.villes = data;
      console.log(this.villes.length);
      this.totalCity=this.villes.length;
     
    },err =>{
      console.log(err);
    }

    
  )
}

onDeleteCity(id){
  let co = confirm("Etes-vous sur de vouloir supprimer cette ville ?");
  if(!co){
    return;
  }
  this.paysService.deleteCity(id)
  .subscribe((data: Pays) =>
    {
      console.log(data);
      this.selectedCountry = data;
      console.log(this.selectedCountry);
      this.getCities(this.selectedCountry.id);
     
    },err=>{
      console.log(err);
    })
}

onEditCity(nom,codePostal,id){
  this.mode='edit-mode-city';
  this.currentCity = nom;
  this.currentCodePostalCity=codePostal;
  this.currentCityId = id;
}

saveCity(data){
  console.log("save city debigging");
  console.log(data);
  console.log(this.selectedId);
  //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
  const dataPost = new FormData();
  dataPost.append('nomVille', this.cityForm.get('nomVille').value);
  dataPost.append('codePostal', this.cityForm.get('codePostal').value);
  dataPost.append('id', this.selectedId);

  // call API to save 

  return this.paysService.enregistrerVille(dataPost)
  .subscribe(
    (data: CityString) =>{

      console.log(data.nomVille);
  if (data.nomVille === 'OK') {
    this.message = 'Ville ajoutée avec succès!';
  } else {
    this.message = 'erreur lors de téléchargement!';
  }
  this.mode='list';
  this.cityForm.get('nomVille').setValue('');
  this.cityForm.get('codePostal').setValue(null);
  this.getAllCitiesByIdCountry();

    }
  )
  
}

}
