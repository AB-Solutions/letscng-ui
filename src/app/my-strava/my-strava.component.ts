import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { CommonUtilService } from '../common-util.service';
import { LoadingEnum } from '../enum/loading.enum';
import * as moment from 'moment';

@Component({
  selector: 'app-my-strava',
  templateUrl: './my-strava.component.html',
  styleUrls: ['./my-strava.component.scss']
})
export class MyStravaComponent implements OnInit {
  athlete: any;
  activities = [];
  environment = environment;
  window = window;
  loggedUser: any;
  noActivitiesFound = false;
  loadingActivities = false;
  filterLast = 7;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private commonUtilService: CommonUtilService,
  ) { }

  setFilterLast(days: number) {
    this.filterLast = days;
    this.getStravaUserActivities();
  }

  getLastDaysTimeStamp(days: number) {
    var dateFrom = moment().subtract(days,'d');
    const startDate = moment(`${dateFrom.day()}/${dateFrom.month()}/${dateFrom.year()}`, 'DD/MM/YYYY');
    // console.log('dateFrom : ', dateFrom);
    // console.log('dateFrom day: ', dateFrom.day());
    // console.log('dateFrom month: ', dateFrom.month());
    // console.log('dateFrom year: ', dateFrom.year());
    // console.log('test: ', moment(`${dateFrom.day()}/${dateFrom.month()}/${dateFrom.year()}`, 'DD/MM/YYYY'));
    // console.log('dateFrom timestamp unix : ', dateFrom.unix());
    // console.log('dateFrom timestamp valueOf: ', dateFrom.valueOf());
    // console.log('date : ', date);
    console.log('startDate : ', startDate.unix());
    return startDate.unix();
  }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    console.log('this.loginUser : ', this.loggedUser);
    this.athlete = this.authService.getStravaUserFromStore()?.athlete;
    console.log('this.athlete : ', this.athlete);
    if (this.athlete && this.athlete.id) {
      this.getStravaUserActivities();
    } else {
      this.activatedRoute.queryParams.subscribe(params => {
        const code = params['code'];
        if (code) {
          console.log('code: ', code);
          this.getStravaUserData(code);
        }
      });
    }
  }

  getStravaUserData(code: string) {
    this.commonUtilService.setloadingMessage('Fetching STRAVA Account');
    this.authService.getStravaProfileDetails(code).subscribe((data: any) => {
      console.log('strava data is ', data);
      this.commonUtilService.setloadingSuccess(LoadingEnum.STRAVA_ACCOUNT_VERIFIED);
      this.athlete = data['athlete'];
      this.authService.setStravaUserInStore(data);
      this.getStravaUserActivities();
    }, (error) => {
      this.commonUtilService.setloadingMessage('');
      console.log('error: ', error);
    });
  }

  sortByDate(data: any) {
    return data.sort((a: any, b: any) => {
      return moment(b.start_date).unix() - moment(a.start_date).unix();
    })
  }

  getStravaUserActivities() {
    this.noActivitiesFound = false;
    this.loadingActivities = true;
    let options: any = {};
    if (this.filterLast) {
      options.after = this.getLastDaysTimeStamp(this.filterLast);
    }

    console.log('options: ', options);

    this.authService.getStravaUserActivities(options).subscribe((data: any) => {
      console.log('activities: ', data);
      this.activities = data.filter((activity: any) => {
        return activity.type === 'Ride';
      });
      this.loadingActivities = false;
      if (this.activities.length === 0) {
        this.noActivitiesFound = true;
      }
    }, (err) => {
      console.log(err);
      this.loadingActivities = false;
      this.fetchStravaRefreshToken();
    });
  }

  fetchStravaRefreshToken() {
    this.authService.getStravaRefreshToken().subscribe((data: any) => {
      console.log('getStravaRefreshToken is :', data);
      if (data.access_token) {
        this.authService.updateStravaAccessToken(data.access_token);
        this.getStravaUserActivities();
      }
    }, (err1) => {
      console.log(err1);
    });
  }

  dtSd() {
    localStorage.removeItem('strava_user_data');
  }

}
