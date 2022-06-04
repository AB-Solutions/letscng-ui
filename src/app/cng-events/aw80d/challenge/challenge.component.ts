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
  @Input() loadingBoosterData: boolean = false;
  @Input() boosterWeek2Data: any = [];
  @Input() loadingBooster2Data: boolean = false;
  @Input() boosterWeek3Data: any = [];
  @Input() loadingBooster3Data: boolean = false;

  selectedTab: number = 4;
  selectedTabBooster3: number = 1;
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
    console.log(changes);
      if (changes['loadingBoosterData']?.currentValue
        || changes['loadingBooster2Data']?.currentValue
        || changes['loadingBooster3Data']?.currentValue
      ) {
        this.commonUtilService.setLoadingMessage('Loading Booster Data');
      } else {
        this.commonUtilService.setLoadingMessage('');
        // this.commonUtilService.showConfetti();
      }

      if (changes['boosterWeekData']?.currentValue.length > 0) {
        for (let i = 0; i < 7; i++) {
          let day: any = this.boosterStartDay + i;
          day = day < 10 ? '0'+day : day;
          this.boosterWeekDays.push(`2022-04-${day}`);
        }

        this.getBottomRiders();
      }

      if (changes['boosterWeek2Data']?.currentValue.length > 0) {
        this.boosterWeek2Data = changes['boosterWeek2Data'].currentValue;
        console.log('boosterWeek2Data : ', this.boosterWeek2Data);
      } else {
        console.log('here pelm na 1');
      }

      if (changes['boosterWeek3Data']?.currentValue.length > 0) {
        this.boosterWeek3Data = changes['boosterWeek3Data'].currentValue;
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

  getRescueTotals(team: number) {
    return (this.boosterWeek2Data.filter((rider: any) => {
      return rider.team === team;
    }).reduce((total: number, rider: any) => {
      return total + rider.ride_distance;
    }, 0)).toFixed(2);
  }

  getBoosterWeek2Data(selectedTab: number) {
    console.log('in getBoosterWeek2Data: ', selectedTab);
    let tabularData = [...this.boosterWeek2Data];

    if (selectedTab !== 4) {
      tabularData = tabularData.filter((rider: any) => {
        return rider.team == this.selectedTab;
      })
    }

    return tabularData.map((rider: any) => {
      return {
        ...rider,
        totalDistance: rider.ride_distance * 1000,
      };
    }).sort((a: any, b: any) => {
      return b.totalDistance - a.totalDistance;
    });
  }

  getBoosterWeek3RiderLeaderboard() {
    this.getBoosterWeek3TeamLeaderboard();
    return this.boosterWeek3Data.map((rider:any) => {
      return {
        ...rider,
        totalDistance: rider.ride_distance * 1000,
      }
    }).sort((riderA: any, riderB: any) => {
      return riderB.ride_distance - riderA.ride_distance;
    });

  }

  getBoosterWeek3TeamLeaderboard() {
    const teamData: any = {};

    for (let i = 0; i < this.boosterWeek3Data.length; i++) {
      const rider = this.boosterWeek3Data[i];
      const teamId = rider.team_id;
      if (teamData[teamId]) {
        teamData[teamId].distance += rider.ride_distance;
      } else {
        teamData[teamId] = {
          distance: rider.ride_distance,
          teamId: teamId,
          teamName: rider.team_name,
        }
      }
    }

    console.log('teamData booster3: ', teamData);
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
