import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { CommonUtilService } from '../services/common-util.service';
import { LoadingEnum } from '../enum/loading.enum';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-strava',
  templateUrl: './my-strava.component.html',
  styleUrls: ['./my-strava.component.scss']
})
export class MyStravaComponent implements OnInit {
  serverHealth = true;
  tornamentTab = 'myride';
  stravaProfileFound = true;
  athlete: any;
  activities: any[] = [];
  environment = environment;
  window = window;
  loggedUser: any;

  constructor(
    public authService: AuthService,
    private commonUtilService: CommonUtilService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.commonUtilService.maintenance) {
      this.router.navigateByUrl('/');
    } else {
      this.loggedUser = this.authService.getLoggedUser();

      if (!this.loggedUser?.user) {
        this.authService.logoutUser();
      } else {
        this.fetchStravaUserData();

        var self = this;
        self.getServerHealth()
        setInterval(function() {
          self.getServerHealth();
        }, 300000);

      }
    }
  }

  getCNGRedirectURI() {
    return environment.backend.cng_redirect_uri;
  }

  fetchStravaUserData() {
    this.commonUtilService.setLoadingMessage('Verifying STRAVA Profile');
    this.authService.getStravaUserFromFireStore(this.authService.getPhoneNumber()).subscribe((data: any)=>{
      this.athlete = data;
      this.commonUtilService.setLoadingMessage('');
    }, (error) => {
      console.log(error);
      this.commonUtilService.setLoadingMessage('');
      this.stravaProfileFound = false;
    });
  }

  setTournamentTab(tab: string) {
    this.tornamentTab = tab;
  }


  getServerHealth() {
    this.commonUtilService.getServerHealth().subscribe((data) => {
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
