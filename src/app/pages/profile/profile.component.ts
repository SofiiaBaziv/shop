import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loggedUser: User;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      this.loggedUser = user;
    }
  }

  logout() {
    this.loggedUser = null;
    this.authService.logout();
  }
}
