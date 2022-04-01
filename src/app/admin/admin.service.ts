import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Banner } from '../model/banner.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseURI = environment.siteManagement.apiBaseURL;
  banners: Banner[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  getBanners() {
    const url = `${this.baseURI}/banners`;
    return this.http.get(url);
  }

  postBanner(banner: Banner) {
    console.log('admin creating new banner: ', banner);
  }

  updateBanner(banner: Banner) {
    console.log('admin updating a banner: ', banner);
  }

  deleteBanner(banner: Banner) {
    console.log('admin deleting a banner: ', banner);
  }
}
