import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { User } from "../models/user.model";
import { ApiService } from './api.service';
import { HttpService } from './http.service';
@Injectable()
export class AuthService {
  private userId: string;

  getUserId(): string | null {
    return this.userId || localStorage.getItem('userId');
  }

  isLoggedIn() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  setUserId(id: string) {
    localStorage.setItem("userId", id);
  }
  constructor(
    private http: HttpService,
    private apiService: ApiService,
    private router: Router
  ) {
  }


  public signUp(signUpData: any): Observable<any> {
    return this.http.post(this.apiService.get("signup"), signUpData).pipe(shareReplay(1));
  }


  public loginUser(loginData: any): Observable<any> {
    return this.http.post(this.apiService.get("login"), loginData).pipe(shareReplay(1),
      tap(() => {


      }));
  }

  public logoutUser(): Observable<any> {
    return this.http.post(this.apiService.get("logout"), {}).pipe(tap(() => {


      this.userId = '';
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      // Optionally perform any cleanup actions
    }));
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  isAdmin() {
    const isAdminString = localStorage.getItem('isAdmin'); // Get the value from local storage as a string
    if (isAdminString === "true") {
      return true;
    } else {
      return false;
    }
  }
  // Setter for isAdmin
  setAdmin(isAdmin: boolean) {
    localStorage.setItem('isAdmin', isAdmin.toString());

  }

  getToken(): string | null {
    // Retrieve the token from localStorage or wherever it's stored
    return localStorage.getItem('token');
  }


  setToken(token: string): void {
    // Store the token in localStorage
    localStorage.setItem('token', token);
  }


  logout(): void {
    // this.isLoggedIn = false;


    // Clear the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
  }

  getUserProfile(id: string): Observable<User> {
    return this.http.get(`${this.apiService.get("getUserProfile")}/${id}`);
  }

  uploadProfilePhoto(photo: FormData) {
    return this.http.post(`${this.apiService.get("photo")}/`, photo);

  }

}
