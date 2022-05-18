import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-booster-table',
  templateUrl: './booster-table.component.html',
  styleUrls: ['./booster-table.component.scss']
})
export class BoosterTableComponent implements OnInit {
  @Input() boosterData: any = [];
  @Input() showRidesCandle: boolean = true;
  @Input() thresholdKm: number = 200;
  showTrophy: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  getRidePillarHeight(max: number, actual: number) {
    if (max === 0 || actual === 0) {
      return 0;
    }

    return (20 / max) * actual;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['boosterData'].currentValue);

    if (changes['boosterData'].currentValue) {
      let boosterData = changes['boosterData'].currentValue;
      this.showTrophy = this.thresholdKm && boosterData.some((rider: any) => {
        return rider.totalDistance/1000 >= this.thresholdKm;
      });
    }
  }

}
