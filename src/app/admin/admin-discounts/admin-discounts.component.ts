import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Discount } from '../../shared/models/discount.model';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-discounts',
  templateUrl: './admin-discounts.component.html',
  styleUrls: ['./admin-discounts.component.scss']
})
export class AdminDiscountsComponent implements OnInit {
  products: Array<Product> = [];
  discountProducts: Array<Product> = [];
  product: Product;
  discounts: Array<Discount> = [];
  discount: Discount = new Discount();
  modalRef: BsModalRef;
  productForEditId: string;
  productForDelete: Product;
  searchDiscount: string;
  order: string;
  reverse = false;

  constructor(
    private modalService: BsModalService,
    private productService: ProductService,
    private orderPipe: OrderPipe) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      collection => {
        this.products = collection
          .map(product => {
            const data = product.payload.doc.data() as Product;
            data.id = product.payload.doc.id;
            return data;
          });
      }
    );

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
  }

  addDiscountModal(template: TemplateRef<any>) {
    this.discount = new Discount();
    this.modalRef = this.modalService.show(template);
  }

  addDiscount(product: Product) {
    product.discount = { ...this.discount };
    this.productService.updateProduct(product.id, product);
    this.modalRef.hide();
  }

  editDiscountModal(template: TemplateRef<any>, product: Product): void {
    this.productForEditId = product.id;
    this.discount = JSON.parse(JSON.stringify(product.discount));
    this.modalRef = this.modalService.show(template);
  }

  editDiscount(): void {
    this.productService.getById(this.productForEditId).subscribe(data => {
      this.product = data;
      this.product.discount = { ...this.discount };
      this.productService.updateProduct(this.productForEditId, this.product);
      this.modalRef.hide();
    });
  }

  deleteDiscountModal(template: TemplateRef<any>, product: Product) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
    this.productForDelete = product;
  }

  deleteDiscount() {
    this.productService.deleteDiscount(this.productForDelete.id);
    this.modalRef.hide();
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

}
