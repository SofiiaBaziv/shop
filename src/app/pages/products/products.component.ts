import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/models/category.model';
import { ProductOrder } from 'src/app/shared/models/product.order.model';
import { CartService } from '../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];
  categories: Array<Category> = [];
  product: Product = new Product();
  searchCategory: string;
  searchProducts: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      collection => {
        this.products = collection.map(product => {
          const data = product.payload.doc.data() as Product;
          data.id = product.payload.doc.id;
          return data;
        });
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

    this.route.params.subscribe(
      params => {
        this.searchCategory = params.category;
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
