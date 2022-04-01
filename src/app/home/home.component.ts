import { Component, OnInit } from '@angular/core';
import { Banner } from '../model/banner.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  banners: Banner[] = [];
  constructor() { }

  ngOnInit(): void {
    console.log('HomeComponenrt');
  }

}
