import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any = {};
  isLoggedIn = false;
  loggedUser = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
  ) { }

  getLoggedUser() {
    return JSON.parse(localStorage.getItem('user_data') || '{}');
  }

  saveUserInStore(userData: any) {
    localStorage.setItem('user_data', JSON.stringify(userData));
    this.loggedUser.emit(true);
    this.router.navigateByUrl('/profile');
  }

  logoutUser() {
    localStorage.removeItem('user_data');
    this.afAuth.signOut();
    this.router.navigateByUrl('/login');
  }

}
