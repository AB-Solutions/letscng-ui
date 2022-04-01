import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { CommonUtilService } from '../common-util.service';
import { LoadingEnum } from '../enum/loading.enum';
import * as moment from 'moment';
import { ErrorFactory } from '@firebase/util';

@Component({
  selector: 'app-my-strava',
  templateUrl: './my-strava.component.html',
  styleUrls: ['./my-strava.component.scss']
})
export class MyStravaComponent implements OnInit {
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private commonUtilService: CommonUtilService,
  ) { }

  setFilterLast(days: number) {
    this.filterLast = days;
    this.getStravaUserActivities();
  }

  getLastDaysTimeStamp(days: number) {
    var dateFrom = moment().subtract(days,'d');
    console.log('dateFrom.month() : ', dateFrom.month());
    const startDate = moment(`${dateFrom.date()}/${dateFrom.month() + 1}/${dateFrom.year()}`, 'DD/MM/YYYY');
    console.log('startDate : ', startDate);
    console.log('startDate : ', startDate.unix());
    return startDate.unix();
  }


  myMethodChangingQueryParams() {
    const queryParams: Params = {};

    this.router.navigate(
      []);
  }


  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();

    this.activatedRoute.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        console.log('code: ', code);
        this.getStravaUserData(code);
      }
    });

    this.getStravaUserDataFromFireDB();
  }

  getStravaUserDataFromFireDB() {
    this.commonUtilService.setloadingMessage('Verifying STRAVA Profile');
    this.authService.getStravaUserFromFireStore(this.loggedUser.user.phoneNumber.replace('+91', '')).subscribe((data: any)=>{
      console.log('fetched strava user data from DB: ', data);
      this.athlete = data;
      // this.authService.setStravaUserInStore(data);
      this.commonUtilService.setloadingMessage('');
      console.log('now fetch rider activities');
      this.getStravaUserActivities();
    }, (error) => {
      console.log('error: ', error);
      this.commonUtilService.setloadingMessage('');
      this.stravaProfileFound = false;
    });
  }

  getStravaUserData(code: string) {
    this.commonUtilService.setloadingMessage('Fetching STRAVA Account');
    this.authService.getStravaProfileDetails(code).subscribe((data: any) => {
      console.log('strava data is ', data);
      // this.commonUtilService.setloadingSuccess(LoadingEnum.STRAVA_ACCOUNT_VERIFIED);
      this.athlete = data['athlete'];
      this.authService.setStravaUserInStore(this.athlete);
      this.commonUtilService.setloadingMessage('');
      // this.getStravaUserActivities();
      this.saveStravaUserInDB({
        ...data,
        phoneNumber: this.loggedUser.user.phoneNumber.replace('+91', ''),
      });

    }, (error) => {
      this.commonUtilService.setloadingMessage('');
      console.log('error: ', error);
    });
  }


  saveStravaUserInDB(user: any) {
    this.commonUtilService.setloadingMessage('Syncing STRAVA Account');
    this.authService.setStravaUserInFireStore(user).subscribe((data) => {
      console.log('user saved in DB: ', data);
      console.log('now: get rides');
      this.stravaProfileFound = true;
      this.commonUtilService.setloadingMessage('');
      console.log('now fetch rider activities');
      this.getStravaUserActivities();
    }, (error) => {
      console.log('error saving user in DB');
      console.log(error);
      this.commonUtilService.setloadingMessage('');
    });
  }

  sortByDate(data: any) {
    return data.sort((a: any, b: any) => {
      return moment(b.start_date).unix() - moment(a.start_date).unix();
    });
  }

  filterByLastDate(data: any) {
    console.log('lastDay: ', this.filterLast);
    this.getLastDaysTimeStamp(this.filterLast);

    var sortedData = data.filter((activity: any) => {
      return (moment(activity.start_date).unix() - this.getLastDaysTimeStamp(this.filterLast)) > 0;
    });

    return this.sortByDate(sortedData);

  }


  syncUserRides() {
    const phone = this.loggedUser.user.phoneNumber.replace('+91', '');

    this.commonUtilService.setloadingMessage('Syncing STRAVA Rides');
    this.authService.syncStravaUserActivities(phone).subscribe((data: any) => {
      console.log('sync success: ', data);

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
    // let options: any = {};
    // if (this.filterLast) {
    //   options.after = this.getLastDaysTimeStamp(this.filterLast);
    // }

    // console.log('options: ', options);
    const phone = this.loggedUser.user.phoneNumber.replace('+91', '');

    this.authService.getStravaUserActivities(phone).subscribe((data: any) => {
      if (data) {
        console.log('activities: ', data);
        var activities = Object.keys(data).map((activityId) => {
          return data[activityId];
        });
        console.log('activities 1: ', activities);
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
      // this.fetchStravaRefreshToken();
    });
  }

  // fetchStravaRefreshToken() {
  //   this.authService.getStravaRefreshToken().subscribe((data: any) => {
  //     console.log('getStravaRefreshToken is :', data);
  //     if (data.access_token) {
  //       this.authService.updateStravaAccessToken(data.access_token);
  //       this.getStravaUserActivities();
  //     }
  //   }, (err1) => {
  //     console.log(err1);
  //   });
  // }

  dtSd() {
    localStorage.removeItem('strava_user_data');
  }

}
