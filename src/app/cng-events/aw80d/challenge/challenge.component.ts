import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { take } from 'rxjs';
import { CommonUtilService } from 'src/app/services/common-util.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {
  boosterWeekData: any = {};
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

  ngOnInit(): void {
    this.getBoosterWeekData();
    console.log('start: ', this.startDate.unix());
    console.log('end: ', this.endDate.unix());
    console.log('now: ', moment.now());

    for (let i = 0; i < 7; i++) {
      let day: any = this.boosterStartDay + i;
      day = day < 10 ? '0'+day : day;
      this.boosterWeekDays.push(`2022-04-${day}`);
    }

    console.log('boosterWeekDays: ', this.boosterWeekDays);
  }

  getBoosterWeekData() {
    this.commonUtilService.setLoadingMessage('Fetching Booster Data');
    this.eventService.getBoosterWeek().pipe(take(1)).subscribe((data: any) => {
      this.commonUtilService.setLoadingMessage('');
      console.log('booster Data: ', data);
      this.boosterWeekData = Object.keys(data).map((riderId) => {
        return data[riderId];
      });

      console.log('this.boosterWeekData : ', this.boosterWeekData);

      // this.getTopRiders();
      this.getBottomRiders();

      // console.log('top riders: ', this.topRidersData);
      console.log('bottom riders: ', this.bottomRidersData);
    }, (error) => {
      console.log('error: ', error);
      this.commonUtilService.setLoadingMessage('');
    });
  }

  getBottomRiders() {
    this.bottomRidersData = this.formBoosterRides(this.boosterWeekData.filter((rider: any) => {
      return rider.booster_team === '-'
    })).sort((a: any, b: any) => {
      return b.totalDistance - a.totalDistance;
    });
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
