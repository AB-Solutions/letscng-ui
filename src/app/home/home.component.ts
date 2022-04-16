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
  constructor(
    private commonService: CommonUtilService,
  ) { }

  ngOnInit(): void {
    this.maintenance = this.commonService.maintenance
  }

}
