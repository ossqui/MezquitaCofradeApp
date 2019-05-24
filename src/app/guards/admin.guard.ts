import { Injectable } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private AuthService: AuthService,
    private router: Router
    ) { }
    
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if((this.AuthService.returnPermisions()=="3")){
        return true;
      }else{
        this.router.navigate(['/home']);
        return false;
      }
  }
  
}
