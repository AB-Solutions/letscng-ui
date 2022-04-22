import { Component, OnInit } from '@angular/core';
import { CommonUtilService } from '../services/common-util.service';
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
      self.loadingText = message;
    });
  }

  showLoading() {
    return this.loadingText.length;
  }

}
