import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EpicorsvcService } from './epicorsvc.service';

@Injectable({
  providedIn: 'root'
})
export class EpicorAuthGuardService implements CanActivate {

  constructor(private epicorSvc:EpicorsvcService, private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.epicorSvc.IsUserLoggedIn())
      return true;
    else
    {
      this.router.navigate(['/Login']);
      return false;
    }
  }
}
