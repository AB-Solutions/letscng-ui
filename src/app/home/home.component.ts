import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CommonUtilService } from '../services/common-util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  maintenance = false;
  carouselIndex: number = 0;
  carouselData: any = [
    {
      image: 'web_banner.jpg',
      link: '',
      desciption: ''
    },
    {
      image: 'cng-brm-300.jpg',
      link: 'https://www.audaxindia.in/event-e-6022',
      description: '',
      smallDesc: 'Register'
    },
    {
      image: 'aw80d2.0jersey.jpg',
      link: '',
      description: '',
      smallDesc: ''
    },
    {
      image: 'aw80d-booster2.jpg',
      link: '',
      description: 'AW80D Booster2 (LIVE)',
      smallDesc: ''
    },
  ];

  constructor(
    private commonService: CommonUtilService,
  ) { }

  ngOnInit(): void {
    this.maintenance = this.commonService.maintenance;
  }

}
