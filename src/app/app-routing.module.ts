import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthRedirectGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorComponent },
  { path: '', component: BooksListComponent, canActivate: [AuthGuard] },
  { path: 'books', component: BooksListComponent, canActivate: [AuthGuard] },
  { path: 'add-book', component: AddBookComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'edit-book/:id', component: AddBookComponent, canActivate: [AuthGuard, AdminGuard] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }