import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPasswordValidator } from './confirm-password.validator';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {



  signUpForm: FormGroup = new FormGroup({});
  errorMessage: Boolean;

  user = {
    name: '',
    email: '',
    password: '',
    confirmedPassword: ''
  };
  submitted = false;
  @Input() password = '';
  @Input() confirmedPassword = '';

  constructor(private router: Router,
    public authService: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5)]),
      'password': new FormControl(null, [Validators.required]),
      'passwordConfirm': new FormControl(null, Validators.required),
    }, {
      validators: confirmPasswordValidator('password', 'passwordConfirm') // Apply confirmPasswordValidator
    });
  }

  onSubmit() {
    this.markFormGroupAsTouched(this.signUpForm);


    if (this.signUpForm?.valid) {
      this.spinner.show();
      this.authService.signUp(this.signUpForm.value).subscribe((res => {
        this.spinner.hide();
        Swal.fire({
          title: "Success!",
          text: "You are signed up successfully!",
          icon: "success",
          timer: 1000
        });
        this.router.navigateByUrl("/login");
      }), (error => {
        this.spinner.hide();
        if (error.error.code === 1100) {
          this.errorMessage = true;
        }

        Swal.fire({
          title: "Error!",
          text: "Account already exist!",
          icon: "error",
          timer: 1000
        });

        this.router.navigateByUrl("/login")

      }))
    }
  }

  openLoginPage() {
    this.router.navigateByUrl("/login");
  }

  markFormGroupAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupAsTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

}
