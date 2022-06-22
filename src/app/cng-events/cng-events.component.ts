import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { take } from 'rxjs';
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
  alertFullMessage: boolean = false;
  selectedTab = 'leaderboard';
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
  boosterWeekData: any = [];
  loadingBoosterData: boolean = false;
  boosterWeek2Data: any = [];
  loadingBooster2Data: boolean = false;
  boosterWeek3Data: any = [];
  loadingBooster3Data: boolean = false;
  topPerformerData: any = {};
  loadingTopPerformers: boolean = false;
  teamTrends: any = {};
  loadingTeamTrends: boolean = false;
  numberOfDay: number = 1;

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

    if (!this.boosterWeekData.length) {
      this.getBoosterWeekData();
    }

    if (!this.boosterWeek2Data.length) {
      this.getBoosterWeek2Data();
    }

    if (!this.boosterWeek3Data.length) {
      this.getBoosterWeek3Data();
    }

    if (!Object.keys(this.topPerformerData).length) {
      this.getTopPerformers();
    }

    if (!Object.keys(this.teamTrends).length) {
      this.getTeamTrends();
    }

    const startDay = moment('2022-04-03', 'YYYY-MM-DD');
    const day = (moment.now()/1000 - startDay.unix())/(24*60*60);
    this.numberOfDay = Math.ceil(day);


    var lastDayStart = moment('2022-06-21 23:59:59.0000', 'YYYY-MM-DD HH:mm:ss.SSSS');
    var lastDayEnds = moment('2022-06-22 23:59:59.0000', 'YYYY-MM-DD HH:mm:ss.SSSS');
    var momentNow = moment.now()/1000;

    if (!this.commonUtilService.maintenance && (momentNow > lastDayStart.unix()) &&(momentNow < lastDayEnds.unix())) {
      // if (!((localStorage.getItem('celebration') && localStorage.getItem('celebration') == 'done'))) {
        this.commonUtilService.showConfetti();
        this.commonUtilService.showGlobalAlert(`
        <b>Fellow Astronauts</b>👩🏻‍🚀,
        <br/><br/>
        Congratulation 🎉 to each and every one of you. Those who succeeded and even those who tried.
        <br/><br/>
        As this journey of 8️⃣0️⃣ days comes to a end, but this also a new beginning of friendship 🤝 built on the base of mutual love ❤️ of cycling.
        <br/><br/>
        The second season of AW80D was bigger and stronger than ever before, we thank each and everyone of your for patience in dealing with us 🙏. Hope your guys had as much fun 😀 as we had creating this event for you.
        <br/><br/>
        Stay tuned 📻for more excitement for the times to come.
        <br/><br/>
        Go speed. Keepin Riding. Let's CNG.`);
        localStorage.setItem('celebration', 'done')
      // }
    }
  }

  refreshTeamTotal() {
    this.teamTotals = {
      running: {},
      valid: {}
    };

    this.fetchTeamTotals(false);
    this.formTeamLeaderboardList();
  }

  refreshLeaderboard() {
    this.loadingTopPerformers = true;
    this.eventService.refreshLeaderboard().pipe(take(1)).subscribe((data: any) => {
      this.getTopPerformers();
    }, (error) => {
      console.log('error: ', error);
    });
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
    }).sort((teamA: any, teamB: any) => {
      return teamB.total - teamA.total;
    }).map((team, index) => {
      let total = team.total;
      if (index <= 10) {
        total = total - 15;
      } else if (index === 13) {
        total = 39938.41 + 15*11;
      }

      return {
        ...team,
        total,
      }
    });

    // .filter((team) => {
    //   return this.lostTeams.indexOf(team.teamId) === -1 || this.rescuedTeams.indexOf(Number(team.teamId)) >= 0;
    // });
    // .sort((teamA, teamB) => {
    //   return teamA.name > teamB.name;
    //   // return teamB.total - teamA.total;
    // });
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
  }


  getBoosterWeekData() {
    this.loadingBoosterData = true;
    this.eventService.getBoosterWeek().pipe(take(1)).subscribe((data: any) => {
      this.loadingBoosterData = false;
      this.boosterWeekData = Object.keys(data).map((riderId) => {
        return data[riderId];
      });
    }, (error) => {
      console.log('error: ', error);
      this.loadingBoosterData = false;
    });
  }

  getBoosterWeek2Data() {
    this.loadingBooster2Data = true;
    this.eventService.getBoosterWeek2().pipe(take(1)).subscribe((data: any) => {
      this.loadingBooster2Data = false;
      this.boosterWeek2Data = Object.keys(data).map((riderId) => {
        return data[riderId];
      });
      // console.log('boosterWeek2Data: ', this.boosterWeek2Data);
      // this.checkRescueTeamsRecovery();
    }, (error) => {
      console.log('error: ', error);
      this.loadingBooster2Data = false;
    });
  }

  getBoosterWeek3Data() {
    this.loadingBooster3Data = true;
    this.eventService.getBoosterWeek3().pipe(take(1)).subscribe((data: any) => {
      this.loadingBooster3Data = false;
      this.boosterWeek3Data = Object.keys(data).map((riderId) => {
        return data[riderId];
      });
      console.log('boosterWeek3Data: ', this.boosterWeek3Data);
      // this.checkRescueTeamsRecovery();
    }, (error) => {
      console.log('error: ', error);
      this.loadingBooster3Data = false;
    });
  }

  // checkRescueTeamsRecovery() {
  //   const rescueTeam1Total = this.boosterWeek2Data.filter((rider: any) => {
  //     return rider.team === 1;
  //   }).reduce((total: number, member: any) => {
  //     return total + member.ride_distance;
  //   }, 0).toFixed(2);

  //   if (rescueTeam1Total >= 4200) {
  //     this.rescuedTeams.push(10);
  //   }
  //   console.log('rescue team 1 total = ', rescueTeam1Total);

  //   const rescueTeam2Total = this.boosterWeek2Data.filter((rider: any) => {
  //     return rider.team === 2;
  //   }).reduce((total: number, member: any) => {
  //     return total + member.ride_distance;
  //   }, 0).toFixed(2);

  //   if (rescueTeam2Total >= 4200) {
  //     this.rescuedTeams.push(13);
  //   }
  //   console.log('rescue team 2 total = ', rescueTeam2Total);

  //   const rescueTeam3Total = this.boosterWeek2Data.filter((rider: any) => {
  //     return rider.team === 3;
  //   }).reduce((total: number, member: any) => {
  //     return total + member.ride_distance;
  //   }, 0).toFixed(2);

  //   if (rescueTeam3Total >= 4200) {
  //     this.rescuedTeams.push(14);
  //   }
  //   console.log('rescue team 3 total = ', rescueTeam3Total);

  //   if(this.rescuedTeams.length >= 1) {
  //     this.announceRescueTeams();
  //   }
  // }


  // announceRescueTeams() {
  //   console.log('Hurray: ', this.rescuedTeams);
  //   console.log('teamLeaderboardList: ', this.teamLeaderboardList);
  //   console.log('this.teamNames: ', this.teamNames);
  //   const plural = this.rescuedTeams.length > 1 ? 's' : '';
  //   this.commonUtilService.showConfetti();
  //   const rescuedTeamNames = this.rescuedTeams.map((teamId: any) => {
  //     return this.teamNames[teamId];
  //   });
  //   this.commonUtilService.showGlobalAlert(`Lost satellite${plural} namely -> <span class="green-text">${rescuedTeamNames.join(', ')}</span> have been rescued by the trusted Rescue Team${plural}.<br/><br/>Congratulations to the Rescue Team${plural} and Welcome back Satellite${plural} <span class="green-text">${rescuedTeamNames.join(', ')}</span> <br/><br/> <b>Note: </b>Leaderboard Rankings will be enabled after all the lost satellites are rescued.`);
  //   this.formTeamLeaderboardList();
  // }

  getTopPerformers() {
    this.loadingTopPerformers = true;
    this.eventService.getLeaderboards().pipe(take(1)).subscribe((data: any) => {
      this.loadingTopPerformers = false;
      this.topPerformerData = data;
    }, (error) => {
      console.log('error: ', error);
      this.loadingTopPerformers = false;
    });
  }

  getTeamTrends() {
    this.loadingTeamTrends = true;
    this.eventService.getTeamTrend().pipe(take(1)).subscribe((data: any) => {
      this.loadingTeamTrends = false;
      this.teamTrends = data;
    }, (error) => {
      console.log('error: ', error);
      this.loadingTeamTrends = false;
    });
  }

}
