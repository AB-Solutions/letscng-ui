import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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
  ) { }

  ngOnInit(): void {
    this.fetchTeamStats();
  }

  fetchTeamStats() {
    console.log('in fetchTeamStats');
    this.loadingStats = true;

    this.eventService.getAw80d2022TeamRides(this.authService.getPhoneNumber()).subscribe((data) => {
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

}
