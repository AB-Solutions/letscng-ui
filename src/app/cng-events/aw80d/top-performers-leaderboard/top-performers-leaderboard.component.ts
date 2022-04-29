import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-top-performers-leaderboard',
  templateUrl: './top-performers-leaderboard.component.html',
  styleUrls: ['./top-performers-leaderboard.component.scss']
})
export class TopPerformersLeaderboardComponent implements OnInit, OnChanges {
  @Input() loadingTopPerformers: boolean = true;
  @Input() topPerformerData: any = {};
  loading: boolean = true;
  allGenderLeaderboard: any = [];
  topMaleLeaderboard: any = [];
  topFemaleLeaderboard: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`changes in this.topPerformerData : `, changes);
    this.loading = changes['loadingTopPerformers'].currentValue;

    let leaderboardData = changes['topPerformerData'].currentValue;

    if (leaderboardData.all || leaderboardData.male || leaderboardData.female) {
      this.allGenderLeaderboard = this.formLeaderboardData('all', leaderboardData);
      this.topMaleLeaderboard = this.formLeaderboardData('male', leaderboardData);
      this.topFemaleLeaderboard = this.formLeaderboardData('female', leaderboardData);
    }

    console.log('allGenderLeaderboard: ', this.allGenderLeaderboard);
    console.log('topMaleLeaderboard: ', this.topMaleLeaderboard);
    console.log('topFemaleLeaderboard: ', this.topFemaleLeaderboard);
  }

  formLeaderboardData(type: string, leaderboardData: any) {
    let leaderboardInitialData = leaderboardData[type];

    return Object.keys(leaderboardInitialData).map((index: string) => {
      return leaderboardInitialData[index];
    }).sort((riderA: any, riderB: any) => {
      return riderB.totals - riderA.totals;
    })

  }

}
