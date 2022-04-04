import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonUtilService } from '../services/common-util.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-cng-events',
  templateUrl: './cng-events.component.html',
  styleUrls: ['./cng-events.component.scss']
})
export class CngEventsComponent implements OnInit {
  loggedUser: any;
  isAw80D2022Participant = false;
  teamNames: any = {};
  teamTotals: any = {
    running: {},
    valid: {}
  };
  teamLeaderboardList: any[] = [];
  aw80dUser: any = {};

  constructor(
    private authService: AuthService,
    private commonUtilService: CommonUtilService,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    if (this.authService.getPhoneNumber()) {
      this.verifyAw80D2022Participant();
    }
    this.fetchTeamTotals(true);
    this.fetchTeamNames();
    this.fetchMyself();
  }

  refreshTeamTotal() {
    this.teamTotals = {
      running: {},
      valid: {}
    };

    this.fetchTeamTotals(false);
    this.formTeamLeaderboardList();
  }

  fetchMyself() {
    this.eventService.getMyTeam(this.authService.getPhoneNumber()).subscribe((data) => {
      console.log('in fetchMyself: ', data);
      this.aw80dUser = data;
    }, (error) => {
      console.log('error: ', error);
    })
  }

  verifyAw80D2022Participant() {
    this.eventService.getAw80d2022ParticipantValidation(this.authService.getPhoneNumber()).subscribe((data) => {
    // this.eventService.getAw80d2022ParticipantValidation('7864864886').subscribe((data) => {
      console.log('verifyAw80D2022Participant data : ', data);
      if (data === 'True') {
        this.isAw80D2022Participant = true;
      } else {
        this.isAw80D2022Participant = false;
      }
    }, (error) => {
      console.log(error);
    });
  }

  fetchTeamTotals(cached: boolean) {

    this.eventService.getAw80d2022TeamTotals(cached).subscribe((data) => {
      console.log('fetched TeamTotals : ', data);
      this.teamTotals = data;
      this.formTeamLeaderboardList();
    }, (error) => {
      console.log(error);
    });
  }

  fetchTeamNames() {
    this.eventService.getAw80d2022TeamNames().subscribe((data) => {
      console.log('fetched Team Names : ', data);
      this.teamNames = data;
      this.formTeamLeaderboardList();
    }, (error) => {
      console.log(error);
    });
  }

  formTeamLeaderboardList () {
    console.log('in formTeamLeaderboardList:', Object.keys(this.teamTotals.running).length);
    const isTeamTotalReady = Boolean(Object.keys(this.teamTotals.running).length);
    console.log('isTeamTotalReady : ', isTeamTotalReady);

    this.teamLeaderboardList = Object.keys(this.teamNames).map((teamId) => {
      const teamName = this.teamNames[teamId];
      return {
        name: teamName,
        logo: `../../../assets/img/aw80dteams/${teamName}.png`,
        total: isTeamTotalReady ? Number(((this.teamTotals.running[teamId])/1000).toFixed(2)) : -1,
      }
    }).sort((teamA, teamB) => {
      return teamB.total - teamA.total;
    });

    console.log('this.teamLeaderboardList : ', this.teamLeaderboardList);
  }

}
