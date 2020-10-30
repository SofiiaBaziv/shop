import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductOrder } from '../../shared/models/product.order.model';
import { ProductsOrder } from '../../shared/models/products.order.model';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  productOrders: ProductOrder[] = [];
  productCount = 1;
  showDelivery = false;

  firstName: string;
  lastName: string;
  deliveryPhone: string;
  deliveryCity: string;
  deliveryAddress: string;

  constructor(
    private cartService: CartService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.productOrders = this.cartService.getCart();
  }

  addProductCount(product, value) {
    this.cartService.addProductCount(product, value);
    this.productOrders = this.cartService.getCart();
  }

  getCartPrice() {
    return this.cartService.getTotalPrice();
  }

  deleteProduct(product) {
    this.cartService.deleteProduct(product);
    this.productOrders = this.cartService.getCart();
  }

  resetCart() {
    this.cartService.resetCart();
    this.productOrders = this.cartService.getCart();
  }

  showDeliveryInputs() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
    }
    this.showDelivery = true;
  }

  submitOrder() {
    const order = new ProductsOrder(this.productOrders, this.deliveryCity, this.deliveryAddress, this.deliveryPhone, this.firstName, this.lastName);
    this.orderService.createOrder(order);
    this.showDelivery = false;
    this.resetCart();
    this.deliveryCity = null;
    this.deliveryAddress = null;
    this.deliveryPhone = null;
  }

}
