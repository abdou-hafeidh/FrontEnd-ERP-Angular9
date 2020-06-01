import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from 'src/service/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {

constructor(private router: Router, private loginService: LoginServiceService) {}

  canActivate(): boolean {
    if (this.loginService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
