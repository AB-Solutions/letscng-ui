import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { CommonUtilService } from '../services/common-util.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-cng-events',
  templateUrl: './cng-events.component.html',
  styleUrls: ['./cng-events.component.scss']
})
export class CngEventsComponent implements OnInit {
  admins = environment.admins;
  isAdmin: boolean = false;
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
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.commonUtilService.maintenance) {
      this.router.navigateByUrl('/');
    }

    this.loggedUser = this.authService.getLoggedUser();
    if (this.authService.getPhoneNumber()) {
      this.verifyAw80D2022Participant();
      this.fetchMyself();

      this.isAdmin = this.authService.isAdminUser();
    }
    this.fetchTeamTotals(true);
    this.fetchTeamNames();
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
    this.eventService.getMyTeamByPhone(this.authService.getPhoneNumber()).subscribe((data) => {
      this.aw80dUser = data;
    }, (error) => {
      console.log('error: ', error);
    })
  }

  verifyAw80D2022Participant() {
    this.eventService.getAw80d2022ParticipantValidation(this.authService.getPhoneNumber()).subscribe((data) => {
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
      this.teamTotals = data;
      this.formTeamLeaderboardList();
    }, (error) => {
      console.log(error);
    });
  }

  fetchTeamNames() {
    this.eventService.getAw80d2022TeamNames().subscribe((data) => {
      this.teamNames = data;
      this.eventService.aw80d2022Teams = data;
      this.formTeamLeaderboardList();
    }, (error) => {
      console.log(error);
    });
  }

  formTeamLeaderboardList () {
    const isTeamTotalReady = Boolean(Object.keys(this.teamTotals.running).length);

    this.teamLeaderboardList = Object.keys(this.teamNames).map((teamId) => {
      const teamName = this.teamNames[teamId];
      return {
        teamId: teamId,
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
