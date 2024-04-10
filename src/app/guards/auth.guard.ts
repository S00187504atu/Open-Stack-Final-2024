import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Assuming you have an AuthService for handling authentication

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // If user is logged in, allow access to the route
    } else {
      this.router.navigate(['/login']); // If user is not logged in, redirect to login page
      return false;
    }
  }
}
