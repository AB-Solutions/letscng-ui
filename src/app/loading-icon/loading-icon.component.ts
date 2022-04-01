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
    this.commonUtilService.loadingMessage.subscribe((message) => {
      this.loadingText = message;
    });

    this.commonUtilService.loadingSuccessMessage.subscribe((message) => {
      switch (message) {
        case LoadingEnum.OTP_SENT:
          this.otpSendSuccess = true;
          var self = this;
          setTimeout(function() {
            self.otpSendSuccess = false;
          }, 1000);
          break;
          case LoadingEnum.OTP_VERIFIED:
            this.otpMessageVerified = true;
            var self = this;
            setTimeout(function() {
              self.otpMessageVerified = false;
            }, 1000);
            break;
          case LoadingEnum.STRAVA_ACCOUNT_VERIFIED:
            this.stravaAccountVerified = true;
            var self = this;
            setTimeout(function() {
              self.stravaAccountVerified = false;
            }, 1000);
            break;
      }
    });
  }

  showLoading() {
    return this.loadingText.length ||
      this.otpSendSuccess ||
      this.otpMessageVerified ||
      this.stravaAccountVerified;
  }

}
