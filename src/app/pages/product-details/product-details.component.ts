import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/models/category.model';
import { ProductOrder } from 'src/app/shared/models/product.order.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();
  productId: string;
  productCount = 1;
  category: Category = new Category();
  categories: Array<Category> = [];
  user: User;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.productId = params.id;
      }
    );
    this.productService.getById(this.productId).subscribe(data => {
      this.product = data;
      this.product.id = this.productId;
    });
    this.categoryService.getCategories().subscribe(
      collection => {
        this.categories = collection.map(category => {
          const data = category.payload.doc.data() as Category;
          data.id = category.payload.doc.id;
          return data;
        });
      }
    );
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser != null) {
      this.userService.getUserById(loggedUser.id).subscribe(doc => {
        this.user = doc as User;
      });
    }
  }

  changeCount(value: number) {
    this.productCount += value;
    if (this.productCount < 1) {
      this.productCount = 1;
    }
    if (this.productCount > 99) {
      this.productCount = 99;
    }
  }

  addToCart() {
    const productOrder = new ProductOrder(this.product, this.productCount);
    this.cartService.addToCart(productOrder);
    this.toastr.success('Продукт успішно додано до корзини', null, {
      positionClass: 'toast-bottom-full-width',
      timeOut: 1500
    });
  }

  addWishlist() {
    if (!this.user.wishlist.some(prod => prod.id === this.product.id)) {
      this.user.wishlist.push(this.product);
      this.userService.updateUser(this.user);
      this.toastr.info('Продукт успішно додано до cписку ', null, {
        positionClass: 'toast-top-left',
        timeOut: 1000
      });
    }
    this.router.navigateByUrl('/profile/profile-likelist');
  }
}
