import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductOrder } from '../models/product.order.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    orders: Array<ProductOrder> = [];
    constructor() { }

    getCart(): Array<ProductOrder> {
        if (localStorage.getItem('cart')) {
            this.orders = JSON.parse(localStorage.getItem('cart'));
        }
        return this.orders;
    }

    resetCart(): void {
        localStorage.removeItem('cart');
        this.orders = [];
    }

    getTotalPrice(): number {
        return this.orders.reduce((total, order) => total + (this.getProductPrice(order.product) * order.count), 0);
    }

    getProductPrice(product): number {
        if (product.hasOwnProperty('discount')) {
            return product.price - product.discount.price;
        } else {
            return product.price;
        }
    }

    deleteProduct(product: Product) {
        this.getCart();
        if (this.orders.some(ord => ord.product.id === product.id)) {
            const index = this.orders.findIndex(ord => ord.product.id === product.id);
            this.orders.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(this.orders));
    }

    addProductCount(product: Product, value: number) {
        this.getCart();
        if (this.orders.some(ord => ord.product.id === product.id)) {
            const index = this.orders.findIndex(ord => ord.product.id === product.id);
            this.orders[index].count += value;
            if (this.orders[index].count < 1) {
                this.orders[index].count = 1;
            }
            if (this.orders[index].count > 99) {
                this.orders[index].count = 99;
            }
        }
        localStorage.setItem('cart', JSON.stringify(this.orders));
    }

    addToCart(productOrder: ProductOrder) {
        if (localStorage.getItem('cart')) {
            this.orders = JSON.parse(localStorage.getItem('cart'));
            if (this.orders.some(ord => ord.product.id === productOrder.product.id)) {
                const index = this.orders.findIndex(ord => ord.product.id === productOrder.product.id);
                this.orders[index].count += productOrder.count;
            }
            else {
                this.orders.push(productOrder);
            }
        } else {
            this.orders.push(productOrder);
        }
        localStorage.setItem('cart', JSON.stringify(this.orders));
    }
}
