import { Component, Input, OnInit } from '@angular/core';
import { Banner } from 'src/app/model/banner.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() banners: Banner[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
