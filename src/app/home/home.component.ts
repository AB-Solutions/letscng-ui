import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  maintenance = true;
  constructor() { }

  ngOnInit(): void {

    // const labels = [
    //   'January',
    //   'February',
    //   'March',
    //   'April',
    //   'May',
    //   'June',
    // ];

    // const data = {
    //   labels: labels,
    //   datasets: [{
    //     label: 'My First dataset',
    //     backgroundColor: 'rgb(255, 99, 132)',
    //     borderColor: 'rgb(255, 99, 132)',
    //     data: [0, 10, 5, 2, 20, 30, 45],
    //   }]
    // };

    // const config = {
    //   type: 'line',
    //   data: data,
    //   options: {}
    // };

    // const myChart = new Chart('myChart', config);
  }

}
