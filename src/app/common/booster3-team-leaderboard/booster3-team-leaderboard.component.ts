import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-booster3-team-leaderboard',
  templateUrl: './booster3-team-leaderboard.component.html',
  styleUrls: ['./booster3-team-leaderboard.component.scss']
})
export class Booster3TeamLeaderboardComponent implements OnInit {
  @Input() boosterWeek3TeamTotals: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
