import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from './http.service';
import { ApiService } from './api.service';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpService,
    private apiService: ApiService
  ) { }

  getBooks(): Observable<[Book]> {
    return this.http.get(this.apiService.get("getBooks"));
  }

  getBook(id: string): Observable<Book> {
    return this.http.get(`${this.apiService.get("getBook")}/${id}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiService.get("addBook"), book);
  }

  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put(`${this.apiService.get("updateBook")}/${id}`, book);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.apiService.get("deleteBook")}/${id}`);
  }

  // editBook(id: string, book: Book): Observable<any> {
  //   return this.http.post(`${this.apiService.get("editBook")}/${id}`, book).pipe(
  //     tap(() => {
  //       // Any additional actions after editing book
  //     })
  //   );
  // }
}
