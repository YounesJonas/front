import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { async } from '@angular/core/testing';
import { Escort } from './common/models/escort';
import { ConfirmationEmail } from './common/models/confirmationEmail';
import { Client } from './common/models/client';

@Injectable({
  providedIn: 'root'
})
export class EscortService {
  jwt: string;
  constructor(
    private http: HttpClient

  ) { }


 public getUsername = (username: string) => {
    
  
    return this.http.get('http://localhost:8090/checkUsername/' + username);
  }

  public checkUsernameClient = (username: string) => {
    return this.http.get('http://localhost:8090/checkUsernameClient/' + username);
  }

  public checkUser = (username: string) => {
    
  
    return this.http.get('http://localhost:8090/checkUsername/' + username);
  }
  public getAllcities = async () => {
    return this.http.get('http://localhost:8090/cities').toPromise();
  }

  public getAllNationalites = async () => {
    return this.http.get('http://localhost:8090/nationalities').toPromise();
  }

  public getEscortByUsername = (username: string) => {
    this.jwt = localStorage.getItem('tocken');
  
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    return this.http.get('http://localhost:8090/escort/' + username, { headers : tocken }).toPromise();
  }

  
  public getEscortByReservationId = (id: number) => {
    this.jwt = localStorage.getItem('tocken');
  
  const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    return this.http.get('http://localhost:8090/escort/disponibilites/' + id, { headers : tocken }).toPromise();
  }

  public getClientByUsername = (username: string) => {
    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    return this.http.get('http://localhost:8090/client/' + username, { headers : tocken }).toPromise();
  }

  public getEscByUser = (username: string) =>{
    return this.http.get('http://localhost:8090/getEscort/' + username).toPromise();
  }

  public getAllEscorts = () =>{
    return this.http.get('http://localhost:8090/allEscorts').toPromise();
  }

  public register = (escort: Escort) => {
    return this.http.post('http://localhost:8090/saveEscort',escort);
  }

  public registerClient = (data) => {
    return this.http.post('http://localhost:8090/saveClient',data);
  }
  public validateEmail = (confirmationEmail: ConfirmationEmail) => {
    return this.http.post('http://localhost:8090/validateEmail',confirmationEmail);
  }

  public getMailFromEscort = (mail: string) => {
    return this.http.get('http://localhost:8090/checkMail/' + mail);
  }

  public getMailFromClient = (email: string) => {
    return this.http.get('http://localhost:8090/checkMailClient/' + email);
  }
  public saveInfoPerso(data){

    console.log("send to back ");
    
   

    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    tocken.set('Content-Type', 'application/json');
    return this.http.post('http://localhost:8090/saveInfoPersoEscort', data, { headers : tocken });
  
  }

  public saveOrientationSexuel(data){
    console.log("sent to back");
    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    tocken.set('Content-Type', 'application/json');
    return this.http.post('http://localhost:8090/saveOrientationSexuel', data, { headers : tocken });
  }

  public saveApropos(data){
    console.log("sent to back");
    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    tocken.set('Content-Type', 'application/json');
    return this.http.post('http://localhost:8090/saveApropos', data, { headers : tocken });
  }

  public saveCoordonnees(data){
    console.log("sent to back");
    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    tocken.set('Content-Type', 'application/json');
    return this.http.post('http://localhost:8090/saveCoordonnees', data, { headers : tocken });
  }

  public savePicture(data){
    console.log("sent to back ...");
    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    tocken.set('Content-Type', 'application/json');
    return this.http.post('http://localhost:8090/savePicture', data, { headers : tocken });
  }

  public deletePicForEscort(id){
    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
//Make a call to back to delete picture
return this.http.get('http://localhost:8090/deletePicture/' + id, { headers : tocken });
  }

  public saveNewEvent(data){
    console.log("send to back ...");
    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    tocken.set('Content-Type', 'application/json');
    return this.http.post('http://localhost:8090/saveNewEvent', data, { headers : tocken });

    
  }

  public saveNewReservation(data){
    console.log("send to back ...");
    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    tocken.set('Content-Type', 'application/json');
    return this.http.post('http://localhost:8090/addReservation', data, { headers : tocken });

    
  }

  public getEvents(username){
    console.log("send to back ...");
    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    tocken.set('Content-Type', 'application/json');
    return this.http.get('http://localhost:8090/disponibilites/' + username, { headers : tocken });
  }
  
  getDisponibilitiesEscort(username){
    console.log("send to back ...");
    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    tocken.set('Content-Type', 'application/json');
    return this.http.get('http://localhost:8090/disponibilities/' + username, { headers : tocken });
  }

  getRequestsForEscort(username){
    console.log("send to back ...");
    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    tocken.set('Content-Type', 'application/json');
    return this.http.get('http://localhost:8090/requests/' + username, { headers : tocken });
  }

  getRequestForClient(username){
    console.log("send to back ...");
    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    tocken.set('Content-Type', 'application/json');
    return this.http.get('http://localhost:8090/requestClient/' + username, { headers : tocken });
  }

  public getReservationInfo(id){
    console.log("sent to back ...");
    return this.http.get('http://localhost:8090/infoReservation/'+id);
  }

  public checkAppointment(id){
    console.log("sent to back ...");
    return this.http.get('http://localhost:8090/chechAppointment/'+id);
  }

  public checkUsernameAppointment(username,id){
    console.log("sent to back ...");
    return this.http.get('http://localhost:8090/checkUsernameAppointment/'+username+'/'+id);
  }

  public majDispoReservation(id,decision){
    console.log("sent to back ...");
    this.jwt = localStorage.getItem('tocken');
    const  tocken = new HttpHeaders().set("Authorization", "Bearer "+ this.jwt);
    tocken.set('Content-Type', 'application/json');
    return this.http.get('http://localhost:8090/majDisponiliteReservation/'+id+'/'+decision,{ headers : tocken });
  }
  public checkUsernameClientEnd(username,id){
    console.log("sent to back ...");
    return this.http.get('http://localhost:8090/checkUsernameClientEnd/'+username+'/'+id);
  }
}
