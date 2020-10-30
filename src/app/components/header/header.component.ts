import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  isloggedUser = false;
  isloggedAdmin = false;
  loggedUser: User;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkLoginStatus();
    this.updateCheckLogin();
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  getCartPrice() {
    return this.cartService.getTotalPrice();
  }

  getCartCount() {
    return this.cartService.getCart().length;
  }

  checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      this.isloggedUser = true;
      this.loggedUser = user;
      if (user.role === 'admin') {
        this.isloggedAdmin = true;
      }
    }
  }

  private updateCheckLogin(): void {
    this.authService.userStatusChanges.subscribe(
      () => {
        this.checkLoginStatus();
      }
    );
  }

  logout() {
    this.isloggedUser = false;
    this.isloggedAdmin = false;
    this.loggedUser = null;
    this.authService.logout();
  }

}
