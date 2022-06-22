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
      image: 'bye-bye-aw80d2.0.jpeg',
      link: '',
      desciption: ''
    },
    {
      image: 'aw80d2.0jersey.jpg',
      link: '',
      description: '',
      smallDesc: ''
    }
  ];

  constructor(
    private commonService: CommonUtilService,
  ) { }

  ngOnInit(): void {
    this.maintenance = this.commonService.maintenance;
  }

}
