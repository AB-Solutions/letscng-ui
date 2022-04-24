import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-booster-table',
  templateUrl: './booster-table.component.html',
  styleUrls: ['./booster-table.component.scss']
})
export class BoosterTableComponent implements OnInit {
  @Input() boosterData: any = [];
  constructor() { }

  ngOnInit(): void {
  }

  getRidePillarHeight(max: number, actual: number) {
    if (max === 0 || actual === 0) {
      return 0;
    }

    return (20 / max) * actual;
  }

}
