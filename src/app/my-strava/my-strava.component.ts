import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { CommonUtilService } from '../common-util.service';
import { LoadingEnum } from '../enum/loading.enum'
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private commonUtilService: CommonUtilService,
  ) { }

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

  getStravaUserActivities() {
    this.noActivitiesFound = false;
    this.loadingActivities = true;
    this.authService.getStravaUserActivities().subscribe((data: any) => {
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
