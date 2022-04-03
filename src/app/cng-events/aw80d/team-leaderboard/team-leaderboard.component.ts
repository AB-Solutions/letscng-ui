import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-team-leaderboard',
  templateUrl: './team-leaderboard.component.html',
  styleUrls: ['./team-leaderboard.component.scss']
})
export class TeamLeaderboardComponent implements OnInit {
  @Input() teams: any[] = [];
  @Input() aw80dUser: any;
  @Output() refresh = new EventEmitter<any>();
  numbers: any= [];

  constructor() {
    this.numbers = Array(13).fill(0).map((x,i)=>i);
  }

  ngOnInit(): void {
  }

  getTotals() {
    if (this.teams.length && this.teams[0].total > 0) {
      return this.teams.reduce((total, team) => {
        return Number((total + team.total).toFixed(2));
      }, 0);
    } else {
      return '----';
    }
  }

  refreshLeaderBoard() {
    this.refresh.emit();
  }

}
