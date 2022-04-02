import { Component, OnInit } from '@angular/core';
import { CommonUtilService } from '../common-util.service';
import { LoadingEnum } from '../enum/loading.enum';
@Component({
  selector: 'app-loading-icon',
  templateUrl: './loading-icon.component.html',
  styleUrls: ['./loading-icon.component.scss']
})
export class LoadingIconComponent implements OnInit {
  loadingText: string = '';
  otpSendSuccess: boolean = false;
  otpMessageVerified: boolean = false;
  stravaAccountVerified: boolean = false;

  constructor(private commonUtilService: CommonUtilService) { }

  ngOnInit(): void {
    var self = this;
    this.commonUtilService.loadingMessage.subscribe((message) => {
      console.log('loadingMessage : ', message);
      self.loadingText = message;
      console.log('self.loadingText : ', self.loadingText);
    });
  }

  showLoading() {
    return this.loadingText.length;
  }

}
