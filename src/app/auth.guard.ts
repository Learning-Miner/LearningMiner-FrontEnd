import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor (
    private userService: UserService,
    private router: Router) {

  }

  canActivate(): boolean {
    if (this.userService.loggedIn()) {
      return true;
    }

    this.router.navigate(['/menuInicio']);
    return false;
  }
}
