import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getAw80d2022ParticipantValidation(phone: any) {
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    const url = `${apiBaseUrl}/user/isAw80D2022Participant?phone=${phone}`;

    return this.http.get(url);
  }

  getAw80d2022UserActivities(phone: any) {
    console.log('in getAw80d2022UserActivities : ', phone);
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

  getAw80d2022TeamTotals() {
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    const url = `${apiBaseUrl}/rides/aw80d2022/teamTotals`;

    return this.http.get(url);
  }

  getAw80d2022TeamRides(phone: any) {
    const {backend} = environment;
    const {apiBaseUrl} = backend;
    const url = `${apiBaseUrl}/rides/aw80d2022/team?phone=${phone}`;

    return this.http.get(url);
  }
}
