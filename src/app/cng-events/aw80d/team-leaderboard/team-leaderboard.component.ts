import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-leaderboard',
  templateUrl: './team-leaderboard.component.html',
  styleUrls: ['./team-leaderboard.component.scss']
})
export class TeamLeaderboardComponent implements OnInit {
  @Input() teams: any[] = [];
  numbers: any= [];

  constructor() {
    this.numbers = Array(13).fill(0).map((x,i)=>i);
  }

  ngOnInit(): void {
  }

  getTotals() {
    if (this.teams.length && this.teams[0].total > 0) {
      return this.teams.reduce((total, team) => {
        console.log('------------');
        console.log('total: ', total);
        console.log('team.total: ', team.total);
        console.log('------------');
        return Number((total + team.total).toFixed(2));
      }, 0);
    } else {
      return '----';
    }
  }

}
