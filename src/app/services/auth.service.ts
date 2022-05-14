import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
    private http: HttpClient,
  ) { }

  getLoggedUser() {
    return JSON.parse(localStorage.getItem('user_data') || '{}');
  }

  saveUserInStore(userData: any) {
    localStorage.setItem('user_data', JSON.stringify(userData));
    this.loggedUser.emit(true);
    this.router.navigateByUrl('/strava');
  }

  getStravaUserFromFireStore(phone: any) {
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    const url = `${apiBaseUrl}/user/strava?phone=${phone}`;

    return this.http.get(url);
  }

  logoutUser() {
    localStorage.removeItem('user_data');
    this.afAuth.signOut();
    this.router.navigateByUrl('/');
  }

  getStravaUserActivities(phone: any) {
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    const url = `${apiBaseUrl}/rides?phone=${phone}`;

    return this.http.get(url);
  }

  syncStravaUserActivities(phone: any) {
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    const url = `${apiBaseUrl}/sync?phone=${phone}`;

    return this.http.get(url);
  }

  fetchSyncLastTime(phone: any) {
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    const url = `${apiBaseUrl}/sync/last_time?phone=${phone}`;

    return this.http.get(url);
  }

  getPhoneNumber() {
    // return '6289730855';
    return this.getLoggedUser()?.user?.phoneNumber.replace('+91', '');
  }

  isAdminUser() {
    return environment.admins.indexOf(this.getPhoneNumber()) >= 0;
  }
}
