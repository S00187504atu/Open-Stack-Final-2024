import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@auth0/auth0-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signInForm!: FormGroup;
  errorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.spinner.show();

    this.markFormGroupAsTouched(this.signInForm);
    this.authService.loginUser(this.signInForm.value).subscribe((res => {
      this.authService.setToken(res.token);
      this.authService.setUserId(res.data.user._id);
      if (res?.data?.user?.isAdmin) {
        this.authService.setAdmin(true);
      } else {
        this.authService.setAdmin(false);
      }
      this.spinner.hide();
      Swal.fire({
        title: "Success!",
        text: "You are logged in successfully!",
        icon: "success",
        timer: 1000
      });

      this.router.navigate(['/books']);
    }), (error => {
      this.spinner.hide();
      if (error) {
        this.errorMessage = error.error.message
      }
    }));
  }

  openRegistrationPage() {
    this.router.navigateByUrl("/signup");
  }

  markFormGroupAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupAsTouched(control);
      }
    });
  }
}