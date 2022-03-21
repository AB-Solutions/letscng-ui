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
  environment = environment;
  window = window;
  loggedUser: any;

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

    } else {
      this.activatedRoute.queryParams.subscribe(params => {
        const code = params['code'];
        if (code) {
          console.log('code: ', code);
          this.commonUtilService.setloadingMessage('Fetching STRAVA Account');
          this.authService.getStravaProfileDetails(code).subscribe((data: any) => {
            console.log('strava data is ', data);
            this.commonUtilService.setloadingSuccess(LoadingEnum.STRAVA_ACCOUNT_VERIFIED);
            this.athlete = data['athlete'];
            this.authService.setStravaUserInStore(data);
          }, (error) => {
            this.commonUtilService.setloadingMessage('');
            console.log('error: ', error);
          });
        }
      });
    }

  }

}
