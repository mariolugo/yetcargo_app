import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Auth } from '../services/auth.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  //user is logged in and checks if user is admin
  canActivate() {
    if (this.auth.isLoggedIn() && this.auth.getUserData().isAdmin() === '0') {
      console.log('not admin');
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}