import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilService {
  loadingMessage = new EventEmitter<string>();
  loadingSuccessMessage = new EventEmitter<string>();
  serverHealth = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
  ) { }

  setloadingMessage(message: string) {
    this.loadingMessage.emit(message);
  }

  setServerHealth(flag: boolean) {
    this.serverHealth.emit(flag);
  }

  getServerHealth() {
    const url = environment.backend.apiBaseUrl;
    return this.http.get(url);
  }
}
