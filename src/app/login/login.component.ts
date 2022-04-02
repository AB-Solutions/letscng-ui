import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import firebase from 'firebase/compat/app';
import "firebase/auth";
import "firebase/firestore";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonUtilService } from '../common-util.service';
import { LoadingEnum } from '../enum/loading.enum';
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
  recaptchaVerifier: any;
  fetchingOtp = false;
  otp: string = '';
  otpContinueDisabled: boolean = false;
  otpCodeError: boolean = false;
  otpConfig = {
    length: 6,
    allowNumbersOnly: true,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  }

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private commonUtilService: CommonUtilService
  ) {
    this.captcha = '';
  }

  ngOnInit(): void {
    firebase.initializeApp(environment.firebaseConfig);
  }

  ngAfterViewInit(): void {
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

      this.phoneWithCountryCode = `+${this.countryCode}${this.phone.value}`;

      console.log('valid Ph num is : ', this.phoneWithCountryCode);

      console.log('this.recaptchaVerifier: ', this.recaptchaVerifier);

      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('firebase-recaptcha', {
        size: 'invisible'
      });

      console.log('this.recaptchaVerifier: ', this.recaptchaVerifier);

      this.commonUtilService.setloadingMessage('Verifying Phone Number');

      firebase.auth().signInWithPhoneNumber(
        this.phoneWithCountryCode,
        this.recaptchaVerifier
      ).then((result) => {
        console.log('result: ', result);
        localStorage.setItem('verificationId', result.verificationId);
        this.commonUtilService.setloadingMessage('');
        this.codeSend = true;

        var self = this;
        setTimeout(function(){
          self.runTimer();
        }, 1000);
      }).catch((error) => {
        this.commonUtilService.setloadingMessage('');
        console.log(error);
      });

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
    this.otpCodeError = false;
    this.verifyFormSubmitted = true;
    const verify = localStorage.getItem('verificationId') || '';

    const credentials = firebase.auth.PhoneAuthProvider.credential(verify, this.otp);
    console.log('credentials : ', credentials);

    this.commonUtilService.setloadingMessage('Verifying OTP');

    firebase.auth().signInWithCredential(credentials).then((response) => {
      console.log('signInWithCredential response: ', response);
      this.commonUtilService.setloadingMessage('');
      this.authService.saveUserInStore(response);
    }).catch(error => {
      this.commonUtilService.setloadingMessage('');
      console.log('signInWithCredential error: ', error);
      this.otpCodeError = true;
    });

  }

  onOtpChange(otp: any) {
    this.otp = otp;
  }

}
