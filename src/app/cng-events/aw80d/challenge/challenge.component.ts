import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { take } from 'rxjs';
import { CommonUtilService } from 'src/app/services/common-util.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnChanges {
  @Input() boosterWeekData: any = [];
  @Input() loadingBoosterData: boolean = false
  bottomRidersData: any = [];
  topRidersData: any = [];
  startDate = moment('04-24-2022 00:00:00:0000', 'MM-DD-YYYY HH:mm:ss.SSSS');
  endDate = moment('04-30-2022 23:59:59', 'MM-DD-YYYY HH:mm:ss');
  boosterStartDay = 24;
  boosterWeekDays: any[] = [];

  constructor(
    private eventService: EventService,
    private commonUtilService: CommonUtilService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['loadingBoosterData'].currentValue) {
        this.commonUtilService.setLoadingMessage('Loading Booster 1');
      } else {
        this.commonUtilService.setLoadingMessage('');
        document.getElementById('celebration-canvas')?.classList.add('active');
        document.getElementById('canvas-close')?.classList.add('active');
      }

      if (changes['boosterWeekData'].currentValue.length > 0) {
        for (let i = 0; i < 7; i++) {
          let day: any = this.boosterStartDay + i;
          day = day < 10 ? '0'+day : day;
          this.boosterWeekDays.push(`2022-04-${day}`);
        }

        this.getBottomRiders();
      }
  }

  getBottomRiders() {
    this.bottomRidersData = this.formBoosterRides(this.boosterWeekData.filter((rider: any) => {
      return rider.booster_team === '-'
    })).sort((a: any, b: any) => {
      return b.totalDistance - a.totalDistance;
    });

    console.log('this.bottomRidersData : ', this.bottomRidersData);
  }

  getTopRiders() {
    this.topRidersData = this.formBoosterRides(this.boosterWeekData.filter((rider: any) => {
      return rider.booster_team === 'fast';
    })).sort((a: any, b: any) => {
      return b.totalDistance - a.totalDistance;
    });
  }

  formBoosterRides(ridersData: any) {
    return ridersData.map((rider: any) => {
      const boosterRides = [];
      for (let i = 0; i < this.boosterWeekDays.length; i++) {
        const dayTotal = rider.rides[this.boosterWeekDays[i]]?.totals;
        boosterRides.push({
          date: this.boosterWeekDays[i],
          distance: dayTotal || 0,
        });
      }

      let maxDistance = 0;
      let totalDistance = 0;
      for (let i = 0; i < boosterRides.length; i++) {
        if (boosterRides[i].distance > maxDistance) {
          maxDistance = boosterRides[i].distance;
        }

        totalDistance += boosterRides[i].distance;
      }

      rider.totalDistance = totalDistance;
      rider.maxDistance = maxDistance;
      rider.boosterRides = boosterRides;
      return rider;
    });
  }
}
