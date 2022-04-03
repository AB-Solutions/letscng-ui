import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-strava-profile',
  templateUrl: './strava-profile.component.html',
  styleUrls: ['./strava-profile.component.scss']
})
export class StravaProfileComponent implements OnInit {
  @Input() athlete: any;
  constructor() { }

  ngOnInit(): void {
  }

}
