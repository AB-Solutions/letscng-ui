import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {
  @Input() numberOfDay: number = 80;
  @Input() loadingTeamTrends: boolean = true;
  @Input() teamTrends: any = {};
  @Input() teamNames: any = {};
  aw80dTeamTrends: any = [];
  colors = ['red', 'black', 'gold', 'palevioletred', 'blue', 'purple', 'yellowgreen', 'maroon', 'violet', 'brown', 'steelblue', 'rosybrown', 'green', 'palevioletred'];
  show = false;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes: ', changes);

    if (changes['teamNames'].currentValue && changes['teamTrends'].currentValue) {
      this.formationTeamsData(changes['teamNames'].currentValue, changes['teamTrends'].currentValue);
      this.show = true;
    }
  }

  formationTeamsData(teamNames: any, teamTrends: any) {
    this.aw80dTeamTrends = Object.keys(teamTrends).map((teamId: string, index: number) => {
    let previousDayData = 0;
      return {
        teamId,
        selected: false,
        teamName: teamNames[teamId],
        colorBand: this.colors[index],
        dayWiseData: Object.keys(teamTrends[teamId]).map((dayData: any, index) => {
          const currentData = teamTrends[teamId][dayData] - previousDayData;
          previousDayData = teamTrends[teamId][dayData];

          return {
            day: index+1,
            date: dayData,
            data: currentData,
            totalData: teamTrends[teamId][dayData]
          };
        }),
      }
    });

    console.log('this.aw80dTeamTrends : ', this.aw80dTeamTrends);
  }

  logTrends(team: any) {
    console.log('team:', team);
    this.show = false;
    setTimeout(()=>{
      this.aw80dTeamTrends[team.teamId - 1].selected = !this.aw80dTeamTrends[team.teamId - 1].selected;
      console.log('this.aw80dTeamTrends: ', this.aw80dTeamTrends);
      this.show = true;
    }, 1);
  }
}
