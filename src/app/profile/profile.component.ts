import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: any = {};
  userFormSubmitted: boolean = false;
  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl({value: '', disabled: true}, [
      Validators.required,
      Validators.min(1000000000),
      Validators.max(9999999999)
    ]),
    dob: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  })
  constructor() { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    console.log('userData is : ', this.userData);
    this.userForm.controls['phoneNumber'].setValue(this.userData.user.phoneNumber);
    this.userForm.controls['phoneNumber'].disable();
  }

  submitForm() {
    this.userFormSubmitted = true;
  }
}
