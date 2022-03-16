import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  countryCode: string = '91';
  captcha: string;
  phoneWithCountryCode: string = '';
  timer: number = 10;
  timerStr: string = '10';

  phone = new FormControl('', [
    Validators.required,
    Validators.min(1000000000),
    Validators.max(99999999999)
  ]);
  sixDigitCode = new FormControl('', [
    Validators.required,
    Validators.min(100000),
    Validators.max(999999)
  ]);
  @ViewChild('phoneNumber')
  phoneNumberElement!: ElementRef;
  smsFormSubmitted: boolean = false;
  verifyFormSubmitted: boolean = false;
  codeSend: boolean = false;
  constructor() {
    this.captcha = '';
  }

  ngOnInit(): void {
  }

  hasError(error: any) {
    console.log('hasError : ', error);
  }

  telInputObject(tellInp: any) {
    console.log('telInputObject : ', tellInp);
  }

  getNumber(getNum: any) {
    console.log('getNumber : ', getNum);
  }

  onCountryChange(change: any) {
    console.log('onCountryChange : ', change);
    if (change.dialCode) {
      this.countryCode = change.dialCode;
    }

    var self = this;
    setTimeout(function(){
      self.phoneNumberElement.nativeElement.focus();
    }, 0);
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    console.log(`captchaResponse is : ${captchaResponse}`);
  }

  verify() {
    this.smsFormSubmitted = true;
    this.timer = 10;
    if (this.phone.valid) {
      console.log(this.phone.valid);
      console.log(this.phone.value);
      this.phoneWithCountryCode = `+${this.countryCode}-${this.phone.value}`;

      console.log('valid Ph num is : ', this.phoneWithCountryCode);
      this.codeSend = true;

      var self = this;
      setTimeout(function(){
        self.runTimer();
      }, 1000);

    }
  }

  runTimer() {
    var self = this;
    console.log('this.timer  : ', this.timer);

    this.timer = this.timer - 1;
    if (this.timer >= 0) {
      this.timerStr = `0${this.timer}`;
      setTimeout(function(){
        self.runTimer();
      }, 1000);
    }
  }


  editPhone() {
    this.smsFormSubmitted = false;
    this.verifyFormSubmitted = false;
    this.codeSend = false;
  }

  codeVerify() {
    this.verifyFormSubmitted = true;
  }

  resendCode() {}


}
