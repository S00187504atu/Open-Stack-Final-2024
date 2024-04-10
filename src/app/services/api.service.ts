import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

const URLS: any = {
  // authentication
  login: { path: "auth/Login" },
  signup: { path: "auth/Signup" },
  logout: { path: "auth/logout" },
  getUserProfile: { path: "auth/me" },
  photo: { path: "auth/photo" },

  addBook: { path: "books/" },
  getBooks: { path: "books" },
  getBook: { path: "books" },
  editBook: { path: "books/" },
  updateBook: { path: "books" },
  deleteBook: { path: "books/" },

};

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl: string = "";

  constructor() {
    this.apiUrl = environment.api_url;
  }

  public get(name: string): string {
    return `${this.apiUrl}${URLS[name].path}`;
  }
}