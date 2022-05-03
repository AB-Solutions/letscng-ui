import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-trend-graph',
  templateUrl: './trend-graph.component.html',
  styleUrls: ['./trend-graph.component.scss']
})
export class TrendGraphComponent implements OnInit {
  @Input() trendData: any = [];
  @ViewChild('graphShell', { static: false }) graphShell: ElementRef | undefined;
  @ViewChild('uj', { static: false }) uj: ElementRef | undefined;
  linePoints: any = [];
  plotPoints = '';
  graphSetting: any = {
    width: null,
    height: 300,
    maxDistance: null,
    maxYScale: null,
    yDiff: null,
    xDiff: null,
    averageDistance: null,
    yScale: [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000]
  }

  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.calculateGraphSettings();
    // this.divHello.nativeElement.innerHTML = "Hello Angular";
  }

  calculateGraphSettings() {
    // const width = document
    this.graphSetting.width = this.uj?.nativeElement.offsetWidth;
    this.graphSetting.xDiff = Number((this.graphSetting.width/this.trendData.dayWiseData.length).toFixed(0));
    this.graphSetting.maxDistance = this.getMaxDistance(this.trendData.dayWiseData.map((dayData: any) => {
      return dayData.data;
    }));

    this.graphSetting.maxYScale = this.getMaxYScale(this.graphSetting.maxDistance, this.graphSetting.yScale);
    console.log('this.graphSetting ', this.graphSetting);
    this.buildLinePoints();
    console.log('points: ', this.linePoints);
  }

  getMaxDistance(distances: any) {
    let max = distances[0];

    for(let i = 1; i < distances.length; i++) {
      if (distances[i] > max) {
        max = distances[i];
      }
    }

    return max;
  }

  getMaxYScale(maxDistance: any, yScale: any) {
    maxDistance = Number((maxDistance/1000).toFixed(2));
    console.log('maxDistance: ', maxDistance);
    console.log('yScale: ', yScale);
    let maxD = yScale[0];

    for(let i = 1; i < yScale.length; i++) {
      if (maxDistance > yScale[i]) {
        maxD = yScale[i + 2];
      }
    }

    return maxD;
  }

  buildLinePoints() {
    this.plotPoints = '';
    this.linePoints = this.trendData.dayWiseData.map((dayData: any, i: number) => {
      const x = i * this.graphSetting.xDiff;
      const y = this.graphSetting.height - Number(((this.graphSetting.height / this.graphSetting.maxYScale) * (dayData.data/1000)).toFixed(0))
      this.plotPoints += `${x},${y} `;

      return {
        x,
        y
      }
    });

    console.log('plotPoints : ', this.plotPoints);
  }

}
