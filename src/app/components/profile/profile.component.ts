import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selectedFile: File;
  selectedFileUrl: string | ArrayBuffer;
  user: User;
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.spinner.show();
    this.authService.getUserProfile(this.authService.getUserId()).subscribe(res => {
      this.user = res;
      this.spinner.hide();
    })
  }
  signOut(id: string) {
    this.spinner.show();

    this.authService.logoutUser().subscribe((res => {
      this.spinner.hide();

      Swal.fire({
        title: "Success!",
        text: "You have been logged out successfully!",
        icon: "success",
        timer: 1000
      });
      this.router.navigateByUrl("/login");
    }), (error => {
      this.spinner.hide();

    }))
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
    // Display preview of the selected image
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFileUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('photo', this.selectedFile);

    this.authService.uploadProfilePhoto(formData).subscribe(res => {
      this.getUserProfile();

    });
  }
}
