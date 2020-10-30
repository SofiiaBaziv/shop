import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss']
})
export class ProfileMainComponent implements OnInit {
  loggedUser: User;

  constructor() { }

 ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      this.loggedUser = user;
    }
  }

}
