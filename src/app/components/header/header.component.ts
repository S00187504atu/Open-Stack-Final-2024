import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // isAdmin$ = this.authService.isAdmin();

  name = 'Angular';
  public isCollapsed = true;
  isAdmin: Boolean = false;
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    // thisthis.authService.isAdmin();

  }


}
