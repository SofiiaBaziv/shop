import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { ProductOrder } from 'src/app/shared/models/product.order.model';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-profile-like-list',
  templateUrl: './profile-like-list.component.html',
  styleUrls: ['./profile-like-list.component.scss']
})
export class ProfileLikeListComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService,
    private cartService: CartService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser != null) {
      this.userService.getUserById(loggedUser.id).subscribe(doc => {
        this.user = doc as User;
      });
    }
  }

  addToCart(product) {
    const productOrder = new ProductOrder(product, 1);
    this.cartService.addToCart(productOrder);
    this.toastr.success('Продукт успішно додано до корзини', null, {
      positionClass: 'toast-bottom-full-width',
      timeOut: 1500
    });
  }

  delete(product) {
    if (this.user.wishlist.some(prod => prod.id === product.id)) {
      const index = this.user.wishlist.findIndex(prod => prod.id === product.id);
      this.user.wishlist.splice(index, 1);
      this.userService.updateUser(this.user);
    }
  }

}
