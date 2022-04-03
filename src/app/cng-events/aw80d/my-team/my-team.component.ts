import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonUtilService } from 'src/app/services/common-util.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'aw80d-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {
  @Input() aw80dUser: any;
  loadingStats: boolean = false;
  teamMemberStats: any[] = [];

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private commonUtilService: CommonUtilService,
  ) { }

  ngOnInit(): void {
    this.fetchTeamStats(true);
  }

  refreshTeamList() {
    this.teamMemberStats = [];
    this.fetchTeamStats(false);
  }

  fetchTeamStats(cached: boolean) {
    console.log('in fetchTeamStats');
    this.loadingStats = true;

    this.eventService.getAw80d2022TeamRides(this.authService.getPhoneNumber(), cached).subscribe((data) => {
      console.log('fetchTeamStats data: ', data);
      this,this.buildTeamStats(data);

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
        name: athlete.firstname + ' ' + athlete.lastname,
        profile: athlete.profile,
        distance: Number((data[phone].TotalDistance / 1000).toFixed(2)),
        me: this.authService.getPhoneNumber() === phone,
        phone: phone,
      };
    }).sort((a, b) => {
      return b.distance - a.distance;
    });

    console.log('teamMemberStats: ', this.teamMemberStats);
  }

  getTeamTotal() {
    return this.teamMemberStats.reduce((total, member) => {
      return total + member.distance;
    }, 0).toFixed(2);
  }

  setRiderView(rider: any) {
    this.commonUtilService.setRiderToView(rider);
    window.scrollTo(0, document.body.scrollHeight);
  }

}
