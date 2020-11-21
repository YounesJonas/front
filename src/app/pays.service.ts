import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaysService {
  jwt: string;

  public host: string = "http://localhost:8090";
  public postCountry: string = "http://localhost:8090/upload";
  public postNationalite: string = "http://localhost:8090/nationalite";
  public postCity: string = "http://localhost:8090/saveCity";
  public putUrl: string = "http://localhost:8090/pays";

  constructor(private http: HttpClient) { }
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  getAllCountries(){
    this.jwt = localStorage.getItem('tocken');
  
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    
    return this.http.get('http://localhost:8090/pays', { headers : tocken });
  }

  getAllNationalities(){
    this.jwt = localStorage.getItem('tocken');
  
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);

  return this.http.get('http://localhost:8090/nationalites', { headers : tocken });
  }

  getCities(id){

    this.jwt = localStorage.getItem('tocken');
  
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
  return this.http.get('http://localhost:8090/villespays/'+id, { headers : tocken });

  }

  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage(id) {

    // get JWT 
  this.jwt = localStorage.getItem('tocken');
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    //Make a call to Sprinf Boot to get the Image Bytes.
    return this.http.get('http://localhost:8090/pays/' + id, { headers : tocken });
     
  }

  // delete a country
  delete(id){
    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
//Make a call to Spring Boot to delete country
return this.http.get('http://localhost:8090/deleteCountry/' + id, { headers : tocken });

  }

  public deleteNationalite(id){
    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    // rest call to delete nationalite
    return this.http.get('http://localhost:8090/deleteNationalite/' + id, { headers : tocken });
  }

  getCountryToModify(url){

    this.jwt = localStorage.getItem('tocken');

  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    return this.http.get(url, { headers : tocken });
  }

  addCountry(data) {
    this.jwt = localStorage.getItem('tocken');
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
  tocken.set('Content-Type', 'application/json');
    return this.http.post(this.postCountry, data, { headers : tocken });
  } 

  addNationalite(data){
    this.jwt = localStorage.getItem('tocken');
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
  tocken.set('Content-Type', 'application/json');
  return this.http.post(this.postNationalite, data, { headers : tocken });
  }

  public enregistrerVille(data){
    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    tocken.set('Content-Type', 'application/json');
      return this.http.post(this.postCity, data, { headers : tocken });
  }

  getPaysName = (paysName: string) => {
      // get JWT 
  this.jwt = localStorage.getItem('tocken');
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
return this.http.get('http://localhost:8090/getPays/' + paysName, { headers : tocken });
}

getNationaliteByName = (nationalite: string) => {
   // get JWT 
   this.jwt = localStorage.getItem('tocken');
   const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
   return this.http.get('http://localhost:8090/getNationalite/' + nationalite, { headers : tocken });
}

getCityName = (cityName: string) => {

      // get JWT 
      this.jwt = localStorage.getItem('tocken');
      const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);

      return this.http.get('http://localhost:8090/getCity/' + cityName, { headers : tocken });

}

getCodePostal = (codePostal: string) => {
  // get JWT 
  this.jwt = localStorage.getItem('tocken');
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);

  return this.http.get('http://localhost:8090/getCodePostal/' + codePostal, { headers : tocken });
}

putCountry(data) {
  this.jwt = localStorage.getItem('tocken');
const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
tocken.set('Content-Type', 'application/json');
  return this.http.post('http://localhost:8090/modifierpays/', data, { headers : tocken });
}

putNationalite(data){
  this.jwt = localStorage.getItem('tocken');
const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
tocken.set('Content-Type', 'application/json');
  return this.http.post('http://localhost:8090/modifierNationalite/', data, { headers : tocken });
}

public putCity(data){
  this.jwt = localStorage.getItem('tocken');
const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
tocken.set('Content-Type', 'application/json');
  return this.http.post('http://localhost:8090/modifierCity/', data, { headers : tocken });
}

 // delete a city
 deleteCity(id){
  this.jwt = localStorage.getItem('tocken');
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    
//Make a call to Spring Boot to delete city
return this.http.get('http://localhost:8090/deleteCity/' + id, { headers : tocken });

}


}
