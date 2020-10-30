import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category.model';
import { Product } from 'src/app/shared/models/product.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

import { ProductOrder } from 'src/app/shared/models/product.order.model';
import { CartService } from '../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hot-deals',
  templateUrl: './hot-deals.component.html',
  styleUrls: ['./hot-deals.component.scss']
})
export class HotDealsComponent implements OnInit {

  discountProducts: Array<Product> = [];
  categories: Array<Category> = [];

  searchCategory: string;
  searchProducts: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      collection => {
        this.discountProducts = collection
          .map(product => {
            const data = product.payload.doc.data() as Product;
            data.id = product.payload.doc.id;
            return data;
          })
          .filter(p => p.hasOwnProperty('discount'));
      }
    );

    this.categoryService.getCategories().subscribe(
      collection => {
        this.categories = collection.map(category => {
          const data = category.payload.doc.data() as Category;
          data.id = category.payload.doc.id;
          return data;
        });
      }
    );
  }

  addToCart(product) {
    const productOrder = new ProductOrder(product, 1);
    this.cartService.addToCart(productOrder);
    this.toastr.success('Продукт успішно додано до корзини', null, {
      positionClass: 'toast-bottom-full-width',
      timeOut: 1500
    });
  }

  setCategory(category: string) {
    this.searchCategory = category;
  }
}
