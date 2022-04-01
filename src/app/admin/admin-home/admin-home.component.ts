import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/model/banner.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  banners: Banner[] = [
    {
      _id: '12345',
      title: 'Banner 1',
      imageUrl: 'image url',
      redirectURI: 'redirect url',
      active: true,
      updatedAt: '1234456',
    },
    {
      _id: '12346',
      title: 'Banner 2',
      imageUrl: 'image url',
      redirectURI: 'redirect url',
      active: true,
      updatedAt: '12344566',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
