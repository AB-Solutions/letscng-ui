import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-leaderboard',
  templateUrl: './team-leaderboard.component.html',
  styleUrls: ['./team-leaderboard.component.scss']
})
export class TeamLeaderboardComponent implements OnInit {
  @Input() teams: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
