import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Auth } from '../providers/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}
  //checks that user is logged in
  canActivate() {
    if (!this.auth.isLoggedIn()) {
      console.log('not auth');
      this.router.navigate(['/log-in']);
      return false;
    }
    return true;
  }
}