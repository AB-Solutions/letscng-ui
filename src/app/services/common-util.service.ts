import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilService {
  maintenance = false;
  loadingMessage = new EventEmitter<string>();
  loadingSuccessMessage = new EventEmitter<string>();
  loadSelectedTeamList = new EventEmitter<string>();
  selectedRiderPhone = new EventEmitter<any>();
  serverHealth = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
  ) { }

  setLoadingMessage(message: string) {
    this.loadingMessage.emit(message);
  }

  setServerHealth(flag: boolean) {
    this.serverHealth.emit(flag);
  }

  getServerHealth() {
    const url = environment.backend.apiBaseUrl;
    return this.http.get(url);
  }

  setRiderToView(rider: any) {
    this.selectedRiderPhone.emit(rider);
  }

  setTeamListToView(id: any) {
    this.loadSelectedTeamList.emit(id);
  }
}
