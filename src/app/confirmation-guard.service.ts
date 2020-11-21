import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EscortService } from './escort.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationGuardService implements CanActivate {

  constructor(public escortService: EscortService, public router: Router) { }
  isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } ;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean  {
    console.log("id value  " +route.paramMap.get('id'));
    console.log("id numeric " +this.isNumber(route.paramMap.get('id')));
    console.log("username value  " +route.paramMap.get('username'));
    
     
    if(!this.isNumber(route.paramMap.get('id'))){
      this.router.navigateByUrl('notFound');
      return false;
    }else{
    
    return this.escortService.checkUsernameAppointment(route.paramMap.get('username'),route.paramMap.get('id')).pipe(
      map(
        e => {
          console.log("log " + JSON.stringify(e));
          if(JSON.stringify(e)==="false"){
            this.router.navigateByUrl('notFound');
             return false;
          }else{
            return true;
          }
        }, err =>{
          console.log("erreur " + err);
          this.router.navigateByUrl('notFound');
          return false;
        }
      )
    )
  }
}
}
