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
    this.router.navigateByUrl('/');
  }

  setStravaUserInStore(data: any) {
    localStorage.setItem('strava_user_data', JSON.stringify(data));
  }

  getStravaUserFromStore() {
    return JSON.parse(localStorage.getItem('strava_user_data') || '{}');
  }

  getStravaUserFromFireStore(phone: any) {
    // phone = '7864864886';
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    const url = `${apiBaseUrl}/user/strava?phone=${phone}`;

    return this.http.get(url);
  }

  setStravaUserInFireStore(user: any) {
    // phone = '7864864886';
    console.log('in setStravaUserInFireStore : ', user);
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    const url = `${apiBaseUrl}/user/setStrava`;

    return this.http.post(url, user);
  }

  logoutUser() {
    localStorage.removeItem('user_data');
    this.afAuth.signOut();
    this.router.navigateByUrl('');
  }

  getStravaProfileDetails(code: string) {
    const {stravaConfig} = environment;
    const url = `${stravaConfig.base_url}/oauth/token?client_id=${stravaConfig.client_id}&client_secret=${stravaConfig.client_secret}&code=${code}&grant_type=authorization_code`;

    return this.http.post(url, {});
  }

  getStravaUserActivities(phone: any) {
    // phone = '7864864886';
    console.log('in getStravaUserActivities : ', phone);
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    const url = `${apiBaseUrl}/rides?phone=${phone}`;

    return this.http.get(url);
  }

  syncStravaUserActivities(phone: any) {
    // phone = '7864864886';
    console.log('in getStravaUserActivities : ', phone);
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    const url = `${apiBaseUrl}/sync?phone=${phone}`;

    return this.http.get(url);
  }

  // getStravaRefreshToken() {
  //   const {stravaConfig} = environment;
  //   const url = `${stravaConfig.base_url}/oauth/token?client_id=${stravaConfig.client_id}&client_secret=${stravaConfig.client_secret}&refresh_token=${this.getStravaUserFromStore().refresh_token}&grant_type=refresh_token`;

  //   return this.http.post(url, {});
  // }

  // updateStravaAccessToken(access_token: string) {
  //   const stravaData = this.getStravaUserFromStore();
  //   stravaData.access_token = access_token;

  //   this.setStravaUserInStore(stravaData);
  // }

}
