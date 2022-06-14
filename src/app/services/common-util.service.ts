import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilService {
  maintenance = true;
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

  showConfetti() {
    document.getElementById('celebration-canvas')?.classList.add('active');
    document.getElementById('canvas-close')?.classList.add('active');
  }

  showGlobalAlert(message: string) {
    const globalAlertElement = document.getElementById('global-alert');
    const globalAlertBody = document.getElementById('global-alert-body');
    globalAlertElement?.classList.add('active');
    if(globalAlertBody) {
      globalAlertBody.innerHTML = message;
    }

  }
}
