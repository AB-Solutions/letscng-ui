import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilService {
  loadingMessage = new EventEmitter<string>();
  loadingSuccessMessage = new EventEmitter<string>();

  constructor() { }

  setloadingMessage(message: string) {
    this.loadingMessage.emit(message);
  }

  setloadingSuccess(message: string) {
    this.loadingMessage.emit('');
    this.loadingSuccessMessage.emit(message);
  }
}
