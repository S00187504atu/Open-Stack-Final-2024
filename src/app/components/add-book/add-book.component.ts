import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  isEdit: Boolean | false;
  id: string;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute
  ) {

    this.bookForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required]
    });

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      // Retrieve the ID from route params
      this.id = params['id'];
      if (this.id) {
        this.isEdit = true;
        this.bookService.getBook(this.id).subscribe(res => {

          this.bookForm.setValue({
            name: res?.name,
            description: res.description,
            price: res.price,
            author: res.author,
            genre: res.genre,
          });
        });
      }
    });
  }

  onSubmit(): any {
    if (this.bookForm.valid) {
      if (this.isEdit) {
        this.bookService.updateBook(this.id, this.bookForm.value).subscribe(res => {
          Swal.fire({
            title: "Success!",
            text: "Book updated successfully!",
            icon: "success",
            timer: 1000
          });
          this.redirectToBookList();
        });
      } else {
        this.bookService.addBook(this.bookForm.value).subscribe(res => {
          Swal.fire({
            title: "Success!",
            text: "Book added successfully!",
            icon: "success",
            timer: 1000
          });
          this.redirectToBookList();
        });
      }
    }
  }


  public redirectToBookList() {
    this.router.navigate(['/books']);
  }
}
