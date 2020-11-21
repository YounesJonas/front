import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EscortService } from './escort.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsGuardService implements CanActivate {

  constructor(public escortService: EscortService, public router: Router) { }
  isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } ;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean  {
    console.log("type of " +route.paramMap.get('id'));
    console.log("type of " +this.isNumber(route.paramMap.get('id')));
    
    
     
    if(!this.isNumber(route.paramMap.get('id'))){
      this.router.navigateByUrl('notFound');
      return false;
    }else{
    
    return this.escortService.checkAppointment(route.paramMap.get('id')).pipe(
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
