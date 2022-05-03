import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  aw80d2022Teams: any = {};
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    const {backend} = environment;
    this.apiBaseUrl = backend.apiBaseUrl;
  }

  getAw80d2022ParticipantValidation(phone: any) {
    const url = `${this.apiBaseUrl}/user/isAw80D2022Participant?phone=${phone}`;

    return this.http.get(url);
  }

  getAw80d2022UserActivities(phone: any) {
    const url = `${this.apiBaseUrl}/rides/aw80d2022?phone=${phone}`;

    return this.http.get(url);
  }

  getAw80d2022TeamNames() {
    const url = `${this.apiBaseUrl}/aw80d_team_names`;

    return this.http.get(url);
  }

  getAw80d2022TeamTotals(cached: boolean) {
    let url = `${this.apiBaseUrl}/rides/aw80d2022/teamTotals`;

    if (cached) {
      url += `?cached=true`;
    }

    return this.http.get(url);
  }

  getAw80d2022TeamRides(phone: any, id: number, cached: boolean) {
    let queryParams = '';

    if (id && id > 0) {
      queryParams += `id=${id}`;
    } else if (phone) {
      queryParams += `phone=${phone}`;
    }

    let url = `${this.apiBaseUrl}/rides/aw80d2022/team?${queryParams}`;

    if (cached) {
      url += `&cached=true`;
    }

    return this.http.get(url);
  }

  getMyTeamByPhone(phone: any) {
    const url = `${this.apiBaseUrl}/user/getAw80D2022Team?phone=${phone}`;

    return this.http.get(url);
  }

  getTeamNameById(id: any) {
    return this.aw80d2022Teams[id];
  }

  getBoosterWeek() {
    const url = `${this.apiBaseUrl}/rides/aw80d2022/boosterWeek?cached=true`;

    return this.http.get(url);
  }

  getLeaderboards() {
    const url = `${this.apiBaseUrl}/rides/aw80d2022/getLeaderboard`;

    return this.http.get(url);
  }

  refreshLeaderboard() {
    const url = `${this.apiBaseUrl}/rides/aw80d2022/refreshLeaderboard`;

    return this.http.get(url);
  }

  markDuplicates() {
    const url = `${this.apiBaseUrl}/markDuplicates`;

    return this.http.get(url);
  }

  getTeamTrend() {
    const url = `${this.apiBaseUrl}/rides/aw80d2022/trend`;

    return this.http.get(url);
  }


}
