import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Assuming you have an AuthService for handling authentication

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      return true; // Allow access to the login page if user is not logged in
    } else {
      this.router.navigate(['/books']); // Redirect to dashboard if user is already logged in
      return false;
    }
  }
}