import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Book } from 'src/app/models/book.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/state/cart.state';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  // isAdmin$ = this.authService.isAdmin();
  books: Book[] = [];
  constructor(
    private bookService: BookService,
    public authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private cartService: CartService
  ) { }
  ngOnInit(): void {
    this.spinner.show();
    this.bookService.getBooks().subscribe(res => {
      this.spinner.hide();

      this.books = res;
    });
  }

  deleteBook(id: any, i: any) {
    this.spinner.show();
    if (window.confirm('Do you want to go ahead?')) {
      this.bookService.deleteBook(id).subscribe((res) => {
        this.spinner.hide();

        Swal.fire({
          title: "Success!",
          text: "Book deleted successfully!",
          icon: "success",
          timer: 1000
        });
        this.books.splice(i, 1);
      }, (error => {
        this.spinner.hide();

        Swal.fire({
          title: "Error!",
          text: "Something went wrong!",
          icon: "error",
          timer: 1000
        });
      }))
    }
  }

  editBook(id: any) {
    this.router.navigate(['/edit', id]);
  }

  onAddToCart(book: any) {
    Swal.fire({
      title: "Success!",
      text: "Book added to cart successfully!",
      icon: "success",
      timer: 1000
    });
    this.cartService.addToCart(book);
  }
}

