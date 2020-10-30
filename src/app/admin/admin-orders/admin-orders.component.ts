import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { ProductsOrder } from '../../shared/models/products.order.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  orders: Array<ProductsOrder> = [];
  modalRef: BsModalRef;
  categoryIdForOrder: string;
  orderForView: ProductsOrder;
  searchOrder: string;
  order: string;
  reverse: boolean = false;

  constructor(private modalService: BsModalService,
              private orderService: OrderService,
              private orderPipe: OrderPipe) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(
      collection => {
        this.orders = collection.map(order => {
          const data = order.payload.doc.data() as ProductsOrder;
          data.id = order.payload.doc.id;
          return data;
        });
      }
    );
  }

  getOrderPrice(order: ProductsOrder) {
    return order.products.reduce((total, productOrder) => total + (this.getProductPrice(productOrder.product) * productOrder.count), 0);
  }

  getProductPrice(product): number {
    if (product.hasOwnProperty('discount')) {
      return product.price - product.discount.price;
    } else {
      return product.price;
    }
  }

  deleteOrdersModal(template: TemplateRef<any>, order: ProductsOrder) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
    this.categoryIdForOrder = order.id;
  }

  deleteOrder() {
    this.orderService.deleteOrder(this.categoryIdForOrder);
    this.modalRef.hide();
  }

  viewOrderModal(template: TemplateRef<any>, order: ProductsOrder): void {
    this.modalRef = this.modalService.show(template);
    this.orderForView = JSON.parse(JSON.stringify(order));
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
}
