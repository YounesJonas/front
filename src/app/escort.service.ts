import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { async } from '@angular/core/testing';
import { Escort } from './common/models/escort';
import { ConfirmationEmail } from './common/models/confirmationEmail';

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

  public getAllcities = async () => {
    return this.http.get('http://localhost:8090/cities').toPromise();
  }


  public register = (escort: Escort) => {
    return this.http.post('http://localhost:8090/saveEscort',escort);
  }

  public validateEmail = (confirmationEmail: ConfirmationEmail) => {
    return this.http.post('http://localhost:8090/validateEmail',confirmationEmail);
  }

  public getMailFromEscort = (mail: string) => {
    return this.http.get('http://localhost:8090/checkMail/' + mail);
  }
}
