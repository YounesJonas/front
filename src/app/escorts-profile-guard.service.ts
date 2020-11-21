import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Params, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Escort } from './common/models/escort';
import { EscortService } from './escort.service';

@Injectable({
  providedIn: 'root'
})
export class EscortsProfileGuardService implements CanActivate {

  
  constructor(public escortService: EscortService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {

    
   return this.escortService.checkUser(route.paramMap.get('userName')).pipe(
     map(
       (e: Escort) => {
         console.log("log " + JSON.stringify(e));
         
         if(e.username===""){
           this.router.navigateByUrl('notFound');
            return false;
         }else{
           return true;
         }
       }
     )
   )

    
   
       
       
        
       
      }
    
    
   
}
