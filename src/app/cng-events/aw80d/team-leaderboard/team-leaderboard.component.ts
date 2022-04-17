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
  @Input() teams: any[] = [];
  @Input() aw80dUser: any;
  @Output() refresh = new EventEmitter<any>();
  numbers: any= [];
  selectedTeam: any;

  constructor(private commonUtilService: CommonUtilService) {
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
    logEvent(getAnalytics(), 'leaderboard refreshed');
    this.refresh.emit();
  }

  loadTeamList(id: any) {
    if (this.isAdmin) {
      this.selectedTeam = id;
      console.log('in loadTeamList: ', id);
      this.commonUtilService.setTeamListToView(id);
      document.getElementById('teamlist')?.scrollIntoView();
    }
  }
}
