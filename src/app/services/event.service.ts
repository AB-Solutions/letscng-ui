import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  aw80d2022Teams: any = {};

  constructor(private http: HttpClient) { }

  getAw80d2022ParticipantValidation(phone: any) {
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    const url = `${apiBaseUrl}/user/isAw80D2022Participant?phone=${phone}`;

    return this.http.get(url);
  }

  getAw80d2022UserActivities(phone: any) {
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    const url = `${apiBaseUrl}/rides/aw80d2022?phone=${phone}`;

    return this.http.get(url);
  }

  getAw80d2022TeamNames() {
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    const url = `${apiBaseUrl}/aw80d_team_names`;

    return this.http.get(url);
  }

  getAw80d2022TeamTotals(cached: boolean) {
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    let url = `${apiBaseUrl}/rides/aw80d2022/teamTotals`;

    if (cached) {
      url += `?cached=true`;
    }

    return this.http.get(url);
  }

  getAw80d2022TeamRides(phone: any, id: number, cached: boolean) {
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    let queryParams = '';

    if (id && id > 0) {
      queryParams += `id=${id}`;
    } else if (phone) {
      queryParams += `phone=${phone}`;
    }

    let url = `${apiBaseUrl}/rides/aw80d2022/team?${queryParams}`;

    if (cached) {
      url += `&cached=true`;
    }

    return this.http.get(url);
  }

  getMyTeamByPhone(phone: any) {
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    const url = `${apiBaseUrl}/user/getAw80D2022Team?phone=${phone}`;

    return this.http.get(url);
  }

  getTeamNameById(id: any) {
    return this.aw80d2022Teams[id];
  }
}
