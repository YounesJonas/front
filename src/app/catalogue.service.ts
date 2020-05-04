import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  jwt: string;

  public host: string = "http://localhost:8087";
  public postCat: string = "http://localhost:8087/categories";
  constructor(private http: HttpClient) {
   
  }


  // getting jwt from localstorage


  // creation of header

  getAllCategories() {

  this.jwt = localStorage.getItem('tocken');
  console.log("valeur de jwt "+this.jwt);
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    console.log(this.jwt);
    console.log(tocken);
    return this.http.get('http://localhost:8087/categories', { headers : tocken });
  }

  getRessource(url) {
    return this.http.get(url);
  }

  deleteCateggory(c){
    console.log(c._links.self.href);
this.jwt = localStorage.getItem('tocken');
  console.log("valeur de jwt "+this.jwt);
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    console.log(this.jwt);
    console.log(tocken);
    console.log(this.http.delete(c._links.self.href, { headers : tocken }));
    return this.http.delete(c._links.self.href, { headers : tocken });
  }

  addCategory(data) {
    this.jwt = localStorage.getItem('tocken');
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
  tocken.set('Content-Type', 'application/json');
    console.log(this.http.post(this.postCat,data, { headers : tocken }));
    return this.http.post(this.postCat, data, { headers : tocken })
  
    
    ;
  } 

    putCategory(data,url) {
    this.jwt = localStorage.getItem('tocken');
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
  tocken.set('Content-Type', 'application/json');
    console.log(this.http.put(url,data, { headers : tocken }));
    return this.http.put(url, data, { headers : tocken })
  
    
    ;
  } 

  getCatToModify(url){

    this.jwt = localStorage.getItem('tocken');
  console.log("valeur de jwt "+this.jwt);
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    console.log(this.jwt);
    console.log(tocken);
    return this.http.get(url, { headers : tocken });
  }
}
