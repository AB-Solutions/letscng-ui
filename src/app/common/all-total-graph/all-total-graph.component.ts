import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-all-total-graph',
  templateUrl: './all-total-graph.component.html',
  styleUrls: ['./all-total-graph.component.scss']
})
export class AllTotalGraphComponent implements OnInit, OnChanges {
  @Input() numberOfDay: number = 80;
  @Input() graphData: any = [];
  @ViewChild('graphShell', { static: false }) graphShell: ElementRef | undefined;
  @ViewChild('uj', { static: false }) uj: ElementRef | undefined;

  graphSetting: any = {
    width: null,
    height: 300,
    maxDistance: null,
    maxYScale: null,
    yDiff: null,
    xDiff: null,
    averageDistance: null,
    yScale: 0,
  };
  plotLines: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes['graphData'].currentValue);
    if (changes['graphData'].currentValue) {
      this.graphData = changes['graphData'].currentValue;
    }
  }


  ngAfterViewInit() {
    this.calculateGraphSettings();
    // this.divHello.nativeElement.innerHTML = "Hello Angular";
  }

  calculateGraphSettings() {
    // const width = document
    this.graphSetting.width = this.uj?.nativeElement.offsetWidth;
    this.graphSetting.xDiff = Number((this.graphSetting.width/this.numberOfDay).toFixed(0));
    this.graphSetting.maxDistance = this.getMaxDistance(this.graphData.map((teamData: any) => {
      return teamData.dayWiseData[teamData.dayWiseData.length - 1].totalData;
    }));

    let maxYScale = 10000;
    while (maxYScale < this.graphSetting.maxDistance / 1000) {
      maxYScale += 10000;
    }

    this.graphSetting.maxYScale = maxYScale;
    this.graphSetting.yDiff = this.graphSetting.height / this.graphSetting.maxYScale;
    console.log('this.graphSetting ', this.graphSetting);
    this.buildLinePoints();
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
    this.plotLines = [];
    console.log('in buildLinePoints');
    let plotLines: any[] = [];
    for (let i = 0; i < this.graphData.length; i++) {
      if(this.graphData[i].selected) {
        console.log('this.graphData : ', this.graphData[i]);
        const dayWiseData = this.graphData[i].dayWiseData;
        let plotPoints = '';
        for (let j = 0; j < dayWiseData.length; j++) {
          const x = j * this.graphSetting.xDiff;
          const y = this.graphSetting.height - Number(((dayWiseData[j].totalData/1000)*this.graphSetting.yDiff).toFixed(0));
          plotPoints += `${x},${y} `;
        }


        plotLines.push({
          color: this.graphData[i].colorBand,
          lineData: plotPoints,
        })
      }
    }
    // let plotPointsData = this.plotPoints = '';
    // var self = this;
    // this.linePoints = this.trendData.dayWiseData.map((dayData: any, i: number) => {
    //   const x = i * this.graphSetting.xDiff;
    //   const y = this.graphSetting.height - Number(((this.graphSetting.height / this.graphSetting.maxYScale) * (dayData.data/1000)).toFixed(0))
    //   plotPointsData += `${x},${y} `;

    //   return {
    //     x,
    //     y
    //   }
    // });

    // setTimeout(() => {
    //   this.plotPoints = plotPointsData;
    // });
    // console.log('plotPointsData : ', plotPointsData);
    setTimeout(()=> {
      this.plotLines = plotLines;
    })
    console.log('this.plotLines : ', this.plotLines);
  }

}
