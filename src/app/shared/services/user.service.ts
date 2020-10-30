import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUsers(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('users').snapshotChanges();
  }

  createUser(user: User) {
    return this.firestore.collection('users').add({ ...user });
  }

  deleteUser(userId: string) {
    return this.firestore.doc('users/' + userId).delete();
  }

  updateUser(user: User) {
    return this.firestore.collection('users').doc(user.id).update(user);
  }

  getUserById(id: string): any {
    return this.firestore.collection('users').doc(id).valueChanges();
  }
}
