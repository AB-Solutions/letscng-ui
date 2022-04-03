import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { CommonUtilService } from '../services/common-util.service';
import { LoadingEnum } from '../enum/loading.enum';
import * as moment from 'moment';

@Component({
  selector: 'app-my-strava',
  templateUrl: './my-strava.component.html',
  styleUrls: ['./my-strava.component.scss']
})
export class MyStravaComponent implements OnInit {
  serverHealth = true;
  tornamentTab = 'master';
  stravaProfileFound = true;
  athlete: any;
  activities: any[] = [];
  environment = environment;
  window = window;
  loggedUser: any;
  noActivitiesFound = false;
  loadingActivities = false;
  filterLast = 7;

  constructor(
    private authService: AuthService,
    private commonUtilService: CommonUtilService,
  ) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    this.fetchStravaUserData();

    var self = this;
    self.getServerHealth()
    setInterval(function() {
      self.getServerHealth();
    }, 300000);
  }

  setFilterLast(days: number) {
    this.filterLast = days;
    this.getStravaUserActivities();
  }

  getLastDaysTimeStamp(days: number) {
    var dateFrom = moment().subtract(days,'d');
    const startDate = moment(`${dateFrom.date()}/${dateFrom.month() + 1}/${dateFrom.year()}`, 'DD/MM/YYYY');
    return startDate.unix();
  }

  getCNGRedirectURI() {
    return environment.backend.cng_redirect_uri;
  }

  getPhoneNumber() {
    return this.loggedUser.user.phoneNumber.replace('+91', '');
  }

  fetchStravaUserData() {
    this.commonUtilService.setloadingMessage('Verifying STRAVA Profile');
    this.authService.getStravaUserFromFireStore(this.getPhoneNumber()).subscribe((data: any)=>{
      this.athlete = data;
      this.commonUtilService.setloadingMessage('');
      this.getStravaUserActivities();
    }, (error) => {
      console.log(error);
      this.commonUtilService.setloadingMessage('');
      this.stravaProfileFound = false;
    });
  }

  sortByDate(data: any) {
    return data.sort((a: any, b: any) => {
      return moment(b.start_date).unix() - moment(a.start_date).unix();
    });
  }

  filterByLastDate(data: any) {
    this.getLastDaysTimeStamp(this.filterLast);

    var sortedData = data.filter((activity: any) => {
      return (moment(activity.start_date).unix() - this.getLastDaysTimeStamp(this.filterLast)) > 0;
    });

    return this.sortByDate(sortedData);
  }

  syncUserRides() {
    const phone = this.getPhoneNumber();

    this.commonUtilService.setloadingMessage('Syncing STRAVA Rides');
    this.authService.syncStravaUserActivities(phone).subscribe((data: any) => {

      this.commonUtilService.setloadingMessage('');
      this.getStravaUserActivities();
    }, (err) => {
      console.log(err);

      this.commonUtilService.setloadingMessage('');
    });
  }


  getStravaUserActivities() {
    this.noActivitiesFound = false;
    this.loadingActivities = true;

    this.authService.getStravaUserActivities(this.getPhoneNumber()).subscribe((data: any) => {
      if (data) {
        var activities = Object.keys(data).map((activityId) => {
          return data[activityId];
        });
        this.activities = activities;
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

  setTournamentTab(tab: string) {
    console.log('in setTournamentTab : ', tab);
    this.tornamentTab = tab;
  }


  getServerHealth() {
    this.commonUtilService.getServerHealth().subscribe((data) => {
      console.log('data: ', data);
      this.serverHealth = true;
    }, (error) => {
      console.log('error: ', error);
      if (error.status && error.status === 200) {
        this.serverHealth = true;
      } else {
        this.serverHealth = false;
      }
    });
  }
}
