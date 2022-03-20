import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-my-strava',
  templateUrl: './my-strava.component.html',
  styleUrls: ['./my-strava.component.scss']
})
export class MyStravaComponent implements OnInit {
  athlete: any;
  environment = environment;
  window = window;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.athlete = this.authService.getStravaUserFromStore()?.athlete;
    console.log('this.athlete : ', this.athlete);
    if (this.athlete && this.athlete.id) {

    } else {
      this.activatedRoute.queryParams.subscribe(params => {
        const code = params['code'];
        if (code) {
          console.log('code: ', code);
          this.authService.getStravaProfileDetails(code).subscribe((data: any) => {
            console.log('strava data is ', data);
            this.athlete = data['athlete'];
            this.authService.setStravaUserInStore(data);
          }, (error) => {
            console.log('error: ', error);
          });
        }
      });
    }

  }

}
