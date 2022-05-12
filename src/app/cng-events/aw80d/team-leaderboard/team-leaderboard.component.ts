import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonUtilService } from 'src/app/services/common-util.service';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-team-leaderboard',
  templateUrl: './team-leaderboard.component.html',
  styleUrls: ['./team-leaderboard.component.scss']
})
export class TeamLeaderboardComponent implements OnInit {
  @Input() isAdmin: boolean = false;
  @Input() numberOfDay: number = 1;
  @Input() teams: any[] = [];
  @Input() aw80dUser: any;
  @Output() refresh = new EventEmitter<any>();
  numbers: any= [];
  selectedTeam: any;
  analytics: any;
  analysis: boolean = false;

  constructor(private commonUtilService: CommonUtilService) {
    this.numbers = Array(13).fill(0).map((x,i)=>i);
  }

  ngOnInit(): void {
    this.analytics = getAnalytics();
    logEvent(this.analytics, 'leaderboard visited');
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
    logEvent(this.analytics, 'leaderboard refreshed');
    this.refresh.emit();
  }

  loadTeamList(team: any) {
    this.selectedTeam = team;
    if (this.isAdmin) {
      this.commonUtilService.setTeamListToView(team.teamId);
      document.getElementById('teamlist')?.scrollIntoView();
    }
  }
}
