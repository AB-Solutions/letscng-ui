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
    this.router.navigateByUrl('/profile');
  }

  setStravaUserInStore(data: any) {
    localStorage.setItem('strava_user_data', JSON.stringify(data));
  }

  getStravaUserFromStore() {
    return JSON.parse(localStorage.getItem('strava_user_data') || '{}');
  }

  logoutUser() {
    localStorage.removeItem('user_data');
    this.afAuth.signOut();
    this.router.navigateByUrl('/login');
  }

  getStravaProfileDetails(code: string) {
    const {stravaConfig} = environment;
    const url = `${stravaConfig.base_url}/oauth/token?client_id=${stravaConfig.client_id}&client_secret=${stravaConfig.client_secret}&code=${code}&grant_type=authorization_code`;

    return this.http.post(url, {});

  }

}
