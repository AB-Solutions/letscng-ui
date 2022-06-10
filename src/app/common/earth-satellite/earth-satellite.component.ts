import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-earth-satellite',
  templateUrl: './earth-satellite.component.html',
  styleUrls: ['./earth-satellite.component.scss']
})
export class EarthSatelliteComponent implements OnInit {
  @Input() teams: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  getOrbitIndex(index: number) {
    let iteration = 14 - index;
    if (iteration <= 7) {
      return iteration;
    } else if (iteration >= 8 && iteration <= 13) {
      return iteration%7;
    } else {
      return 7;
    }

  }

  getRotation(total: number) {
    return ((360 * 1.5 * total) / 40075).toFixed(0);
  }

  getColor() {
    return 'red';
  }
}
