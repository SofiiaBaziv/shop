import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: AngularFirestore) { }

  getCategories(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('categories').snapshotChanges();
  }

  createCategory(category: Category) {
    return this.firestore.collection('categories').add({ ...category });
  }

  deleteCategory(categoryId: string) {
    return this.firestore.doc('categories/' + categoryId).delete();
  }

  updateCategory(category: Category) {
    return this.firestore.collection('categories').doc(category.id).update(category);
  }

  getCategoryById(id): any {
    return this.firestore.collection('categories').doc(id).valueChanges();
  }
}
