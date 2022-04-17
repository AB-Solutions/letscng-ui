import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonUtilService } from 'src/app/services/common-util.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-plot-graph',
  templateUrl: './plot-graph.component.html',
  styleUrls: ['./plot-graph.component.scss']
})
export class PlotGraphComponent implements OnInit {
  @Input() aw80dUser: any;
  @Input() teamId: number = -1;
  maxKm: number = 0;
  plotSettings: any = {};
  loadingStats: boolean = false;
  teamMemberStats: any[] = [];
  selectedMember: any = {};

  constructor(
    private eventService: EventService,
    public authService: AuthService,
    private commonUtilService: CommonUtilService,
  ) { }

  ngOnInit(): void {
    this.fetchTeamStats(true);

    this.commonUtilService.loadSelectedTeamList.subscribe((id) => {
      console.log('Hey now load team details for : ', id);
      this.teamId = Number(id);
      this.fetchTeamStats(true);
    });
  }

  getTeamName() {
    return this.eventService.getTeamNameById(this.teamId);
  }

  fetchTeamStats(cached: boolean) {
    this.loadingStats = true;

    this.eventService.getAw80d2022TeamRides(this.authService.getPhoneNumber(), this.teamId, cached).subscribe((data) => {
      this.buildTeamStats(data);
      this.calculateGraphSettings();
      this.loadingStats = false;
    }, (error) => {
      console.log(error);

      this.loadingStats = false;
    });
  }

  buildTeamStats(data: any) {
    this.teamMemberStats = Object.keys(data).filter((memberPhone) => {
      return data[memberPhone].Athlete.id > 0;
    }).map((phone) => {
      const athlete = data[phone].Athlete;
      return {
        id: athlete.id,
        name: athlete.firstname + ' ' + athlete.lastname,
        profile: athlete.profile,
        distance: Number((data[phone].TotalDistance / 1000).toFixed(2)),
        me: this.authService.getPhoneNumber() === phone,
        phone: phone,
      };
    }).sort((a, b) => {
      return b.distance - a.distance;
    });

    console.log('final team stats: ', this.teamMemberStats);
  }

  calculateGraphSettings() {
    this.plotSettings.maxKmAttain = this.teamMemberStats[0].distance;
    this.plotSettings.minKmAttain = this.teamMemberStats[9].distance;
    this.plotSettings.scale = [];

    for (let i = 1; i <= 100; i++) {
      this.plotSettings.scale.push(i * 100);
    }

    console.log('scale: ', this.plotSettings.scale);
    console.log('maxKmAttain: ', this.plotSettings.maxKmAttain);
    console.log('minKmAttain: ', this.plotSettings.minKmAttain);

    this.plotSettings.minY = this.plotSettings.scale[0];
    this.plotSettings.maxY = this.plotSettings.scale[this.plotSettings.scale.length - 1];

    for (let i = 0; i < this.plotSettings.scale.length; i++) {
      if (this.plotSettings.minKmAttain > this.plotSettings.scale[i] && this.plotSettings.minKmAttain <= this.plotSettings.scale[i+1]) {
        this.plotSettings.minY = this.plotSettings.scale[i - 1];
        break;
      }
    }

    for (let i = 0; i < this.plotSettings.scale.length; i++) {
      if (this.plotSettings.maxKmAttain > this.plotSettings.scale[i] && this.plotSettings.maxKmAttain <= this.plotSettings.scale[i+1]) {
        this.plotSettings.maxY = this.plotSettings.scale[i + 2];
        break;
      }
    }

    console.log('minY: ', this.plotSettings.minY);
    console.log('maxY: ', this.plotSettings.maxY);

    this.plotSettings.scaleDiffKm = this.plotSettings.maxY - this.plotSettings.minY;
    this.plotSettings.diffYPerKm = 200 / this.plotSettings.scaleDiffKm;

    this.plotSettings.xCoordinates = [];
    for (let i = this.plotSettings.scale.indexOf(this.plotSettings.minY); i <= this.plotSettings.scale.indexOf(this.plotSettings.maxY); i++) {
      this.plotSettings.xCoordinates.push({
        y: this.plotSettings.diffYPerKm * (this.plotSettings.scale[i] - this.plotSettings.minY),
        value: this.plotSettings.scale[i],
      });
    }

    const riderPositionsContainer = document.querySelector('.rider-positions-container');
    const width = riderPositionsContainer?.clientWidth;

    console.log('width ----->', width);

    this.plotSettings.xDiff = (width || 300) / 11;

    console.log('this.plotSettings : ', this.plotSettings);
  }

  getRiderBottomPosition(rider: any) {
    console.log('(rider.distance - this.plotSettings.minY) * this.plotSettings.diffYPerKm; : ', (rider.distance - this.plotSettings.minY) * this.plotSettings.diffYPerKm);
    return (rider.distance - this.plotSettings.minY) * this.plotSettings.diffYPerKm;
  }
}
