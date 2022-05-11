import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonUtilService } from 'src/app/services/common-util.service';
import { EventService } from 'src/app/services/event.service';
import { getAnalytics, logEvent } from "firebase/analytics";
import { take } from 'rxjs';

@Component({
  selector: 'aw80d-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {
  @Input() numberOfDay: number = 80;
  @Input() isAdmin: boolean = false;
  @Input() aw80dUser: any;
  @Input() teamId: number = -1;
  loadingStats: boolean = false;
  teamMemberStats: any[] = [];
  selectedMember: any = {};
  analytics: any;
  analysis = false;

  constructor(
    private eventService: EventService,
    public authService: AuthService,
    private commonUtilService: CommonUtilService,
  ) { }

  ngOnInit(): void {
    this.analytics = getAnalytics();
    logEvent(this.analytics, 'team list visited');
    this.fetchTeamStats(true);

    this.commonUtilService.loadSelectedTeamList.subscribe((id) => {
      this.teamId = Number(id);
      this.fetchTeamStats(true);
    });
  }

  getTeamName() {
    return this.eventService.getTeamNameById(this.teamId);
  }

  markDuplicate() {
    this.commonUtilService.setLoadingMessage('Removing Duplicate Rides');
    this.eventService.markDuplicates().pipe(take(1)).subscribe((data) => {
      this.commonUtilService.setLoadingMessage('');
    }, (error) => {
      this.commonUtilService.setLoadingMessage('');
      console.log('error: ', error);
    });
  }

  refreshTeamList() {
    logEvent(this.analytics, 'team list refreshed');
    this.teamMemberStats = [];
    this.fetchTeamStats(false);
  }

  fetchTeamStats(cached: boolean) {
    this.loadingStats = true;

    this.eventService.getAw80d2022TeamRides(this.authService.getPhoneNumber(), this.teamId, cached).subscribe((data) => {
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
  }

  getTeamTotal() {
    return this.teamMemberStats.reduce((total, member) => {
      return total + member.distance;
    }, 0).toFixed(2);
  }

  setRiderView(rider: any) {
    this.selectedMember = rider;
    this.commonUtilService.setRiderToView(rider);
    window.scrollTo(0, document.body.scrollHeight);
  }

}
