import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { AngularFireStorage } from '@angular/fire/storage';

import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../shared/services/category.service';
import { Observable } from 'rxjs';
import { Discount } from 'src/app/shared/models/discount.model';

import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  product: Product = new Product();
  productForEdit: Product;
  products: Array<Product> = [];
  modalRef: BsModalRef;
  categories: Array<Category> = [];
  selectedCategory: Category;
  isEdit = false;

  imageStatus: boolean;
  uploadProgress: Observable<number>;
  productIdForDelete: string;

  searchProducts: string;

  order: string;
  reverse = false;

  constructor(
    private modalService: BsModalService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private afStorage: AngularFireStorage,
    private orderPipe: OrderPipe) { }

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
  }

  addProductModal(template: TemplateRef<any>) {
    this.product = new Product();
    this.modalRef = this.modalService.show(template);
    this.imageStatus = false;
  }

  addProduct() {
    this.productService.createProduct(this.product);
    this.modalRef.hide();
  }

  editProductModal(template: TemplateRef<any>, product: Product): void {
    this.modalRef = this.modalService.show(template);
    this.productForEdit = JSON.parse(JSON.stringify(product));
  }

  editProduct(): void {
    this.productService.updateProduct(this.productForEdit.id, this.productForEdit);
    this.modalRef.hide();
  }

  deleteProductModal(template: TemplateRef<any>, product: Product) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
    this.productIdForDelete = product.id;
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productIdForDelete);
    this.modalRef.hide();
  }

  uploadFile(event, product): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `images/${name}.${type}`;
    const upload = this.afStorage.upload(filePath, file);
    this.uploadProgress = upload.percentageChanges();
    upload.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        product.image = url;
        this.imageStatus = true;
      });
    });
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  deleteImage(productWIthImage) {
    this.afStorage.storage.refFromURL(productWIthImage.image).delete();
    this.imageStatus = false;
    productWIthImage.image = null;
  }

}

