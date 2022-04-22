import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { CommonUtilService } from 'src/app/services/common-util.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.component.html',
  styleUrls: ['./my-rides.component.scss']
})
export class MyRidesComponent implements OnInit {
  @Input() isEventUser: boolean = false;
  @Input() isFilterDisabled: boolean = false;
  lastSyncUTCDateTime: any;
  lastSyncDateTime: any;
  isSyncAllowed: boolean = false;
  lastSyncFetched: boolean = true;
  syncDisabled = false;
  activities: any[] = [];
  limit = 10;
  limitExceeded = false;

  noActivitiesFound = false;
  loadingActivities = false;
  filterLast = 7;

  constructor(
    public authService: AuthService,
    private commonUtilService: CommonUtilService,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    if (this.isEventUser) {
      this.getUserActivitiesByEvent();
    } else {
      this.getSyncLastTime();
      this.getStravaUserActivities();
    }

    this.commonUtilService.selectedRiderPhone.subscribe((rider: any) => {
      this.getUserActivitiesByEvent(rider.phone);
    });
  }

  getDate(dateStr: any) {
    const d = new Date(dateStr);
    let date: any = d.getDate();
    if (date < 10) {
      date = `0${date}`;
    }
    let month: any = d.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const year = d.getFullYear();
    let hour: any = d.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minute: any = d.getMinutes();
    if (minute < 10) {
      minute = `0${minute}`;
    }
    return `${date}/${month}/${year} ${hour}:${minute}`;
  }

  getDistance(distance: number) {
    return (distance/1000).toFixed(2);
  }

  getAvgSpeed(avgSpeed: any) {
    return Number((Number(avgSpeed) * 3.6).toFixed(2));
  }

  loadMore() {
    if (this.limit < this.activities.length) {
      this.limit += 10;
    } else {
      this.limitExceeded = true;
    }
  }

  setFilterLast(days: number) {
    this.filterLast = days;
    if (this.isEventUser) {
      this.getUserActivitiesByEvent();
    } else {
      this.getStravaUserActivities();
    }
  }


  getStravaUserActivities() {
    this.noActivitiesFound = false;
    this.loadingActivities = true;

    this.authService.getStravaUserActivities(this.authService.getPhoneNumber()).subscribe((data: any) => {
      if (data) {
        var activities = Object.keys(data).map((activityId) => {
          return data[activityId];
        });
        this.activities = this.filterByLastDate(activities);
      } else {
        this.activities = [];
      }
      this.loadingActivities = false;
      if (this.activities.length === 0) {
        this.noActivitiesFound = true;
      }
    }, (err) => {
      console.log(err);
      this.loadingActivities = false;
    });
  }

  getUserActivitiesByEvent(phone?: any) {
    this.noActivitiesFound = false;
    this.loadingActivities = true;
    this.activities = [];

    this.eventService.getAw80d2022UserActivities(phone ? phone : this.authService.getPhoneNumber()).subscribe((data: any) => {
      if (data) {
        var activities = Object.keys(data).map((activityId) => {
          return data[activityId];
        });
        this.activities = this.filterByLastDate(activities);
      } else {
        this.activities = [];
      }
      this.loadingActivities = false;
      if (this.activities.length === 0) {
        this.noActivitiesFound = true;
      }
    }, (err) => {
      console.log(err);
      this.loadingActivities = false;
      this.noActivitiesFound = true;
    });
  }


  syncUserRides() {
    // this.syncDisabled = true;
    // var self = this;
    // setTimeout(function(){
    //   self.syncDisabled = false;
    // }, 6000);
    const phone = this.authService.getPhoneNumber();

    this.commonUtilService.setloadingMessage('Syncing STRAVA Rides');
    this.authService.syncStravaUserActivities(phone).subscribe((data: any) => {
      this.getSyncLastTime();
      this.commonUtilService.setloadingMessage('');

      if (this.isEventUser) {
        this.getUserActivitiesByEvent();
      } else {
        this.getStravaUserActivities();
      }

    }, (err) => {
      console.log(err);

      this.commonUtilService.setloadingMessage('');
    });
  }

  getSyncLastTime() {
    this.isSyncAllowed = false;
    this.lastSyncFetched = false;
    this.lastSyncDateTime = '';
    this.lastSyncUTCDateTime = '';
    const phone = this.authService.getPhoneNumber();
    this.authService.fetchSyncLastTime(phone).subscribe((data: any) => {
      this.lastSyncUTCDateTime = data;
      this.lastSyncFetched = true;
      this.buildSyncDateTimeSettings();
    }, (err) => {
      this.isSyncAllowed = true;
      console.log(err);
    });
  }

  buildSyncDateTimeSettings() {
    if (this.lastSyncUTCDateTime) {
      var utcSyncDate = moment.utc(this.lastSyncUTCDateTime, 'YYYY-MM-DD HH:mm:ss.SSSS');
      // var utcSyncDate = moment.utc("2022-04-09 08:30:23.670962", 'YYYY-MM-DD HH:mm:ss.SSSS');
      var localDate = moment(utcSyncDate.toDate()).local();
      this.lastSyncDateTime = localDate.format('DD-MM-YYYY HH:mm');
      var currentNow = Number((moment.now() / 1000).toFixed(0));
      var diffSyncTime = currentNow - localDate.unix();
      this.isSyncAllowed = diffSyncTime > (24*60*60);
    }
  }

  sortByDate(data: any) {
    return data.sort((a: any, b: any) => {
      return moment(b.start_date).unix() - moment(a.start_date).unix();
    });
  }

  getLastDaysTimeStamp(days: number) {
    var dateFrom = moment().subtract(days,'d');
    const startDate = moment(`${dateFrom.date()}/${dateFrom.month() + 1}/${dateFrom.year()}`, 'DD/MM/YYYY');
    return startDate.unix();
  }

  filterByLastDate(data: any): any {
    if (this.isFilterDisabled) {
      return this.sortByDate(data);
    } else {
      var sortedData = data.filter((activity: any) => {
        return (moment(activity.start_date).unix() - this.getLastDaysTimeStamp(this.filterLast)) > 0;
      });

      return this.sortByDate(sortedData);
    }
  }
}
