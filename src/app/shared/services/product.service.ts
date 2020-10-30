import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) { }

  getProducts(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('products').snapshotChanges();
  }

  createProduct(product: Product) {
    return this.firestore.collection('products').add({ ...product });
  }

  deleteProduct(productId: string) {
    this.firestore.doc('products/' + productId).delete();
  }

  updateProduct(id: string, product: Product) {
    this.firestore.collection('products').doc(id).update(product);
  }

  getById(id): any {
    return this.firestore.collection('products').doc(id).valueChanges();
  }

  deleteDiscount(id) {
    const docRef = this.firestore.collection('products').doc(id);
    docRef.update({
      discount: firebase.firestore.FieldValue.delete()
    });
  }
}
