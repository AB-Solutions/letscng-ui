import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {

  @Input() loadingTeamTrends: boolean = true;
  @Input() teamTrends: any = {};
  @Input() teamNames: any = {};
  aw80dTeamTrends: any = [];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes: ', changes);

    if (changes['teamNames'].currentValue && changes['teamTrends'].currentValue) {
      this.formationTeamsData(changes['teamNames'].currentValue, changes['teamTrends'].currentValue);
    }
  }

  formationTeamsData(teamNames: any, teamTrends: any) {
    this.aw80dTeamTrends = Object.keys(teamTrends).map((teamId: string) => {
    let previousDayData = 0;
      return {
        teamId,
        teamName: teamNames[teamId],
        dayWiseData: Object.keys(teamTrends[teamId]).map((dayData: any, index) => {
          const currentData = teamTrends[teamId][dayData] - previousDayData;
          previousDayData = teamTrends[teamId][dayData];

          return {
            day: index+1,
            date: dayData,
            data: currentData
          };
        }),
      }
    });

    console.log('this.aw80dTeamTrends : ', this.aw80dTeamTrends);
  }
}
