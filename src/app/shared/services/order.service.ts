import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { ProductsOrder } from '../models/products.order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: AngularFirestore) { }

  getOrders(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('orders').snapshotChanges();
  }

  createOrder(order: ProductsOrder) {
    return this.firestore.collection('orders').add({ ...order });
  }

  deleteOrder(productId: string) {
    return this.firestore.doc('orders/' + productId).delete();
  }

  updateOrder(order: ProductsOrder) {
    return this.firestore.collection('orders').doc(order.id).update(order);
  }

  getOrderById(id): any {
    return this.firestore.collection('orders').doc(id).valueChanges();
  }
}
