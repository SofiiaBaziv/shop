import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUser: any;
    userStatusChanges: Subject<string> = new Subject<string>();

    constructor(
        private angularFireAuth: AngularFireAuth,
        private firestore: AngularFirestore,
        private router: Router) { }

    login(email: string, password: string): void {
        this.angularFireAuth.signInWithEmailAndPassword(email, password).then(user => {
            this.firestore.collection('users').ref.where('id', '==', user.user.uid).onSnapshot(snap => {
                snap.forEach(userRef => {
                    this.currentUser = userRef.data();
                    localStorage.setItem('user', JSON.stringify(this.currentUser));
                    if (this.currentUser.role === 'admin') {
                        this.router.navigateByUrl('/admin');
                        this.userStatusChanges.next('admin');
                    }
                    else if (this.currentUser.role === 'user') {
                        this.router.navigateByUrl('/profile');
                        this.userStatusChanges.next('profile');
                    }
                });
            }
            );
        }).catch(err => console.log(err));
    }

    logout(): void {
        this.angularFireAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigateByUrl('home');
            this.userStatusChanges.next('logout');
        });
    }

    register(email: string, password: string, userfirstName: string, userlastName: string): void {
        this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(userResponse => {
            const newId = userResponse.user.uid
            const user = {
                id: newId,
                email: userResponse.user.email,
                firstName: userfirstName,
                lastName: userlastName,
                role: 'user',
                wishlist: []
            };
            this.firestore.collection('users').doc(newId).set(user).then(() => {
                alert('Registration successful');
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }
}
