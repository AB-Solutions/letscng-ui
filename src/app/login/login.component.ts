import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  captcha: string;
  email: string;

  constructor() {
    this.captcha = '';
    this.email = 'ujjal1991@gmail.com';
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
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    console.log(`captchaResponse is : ${captchaResponse}`);
  }
}
