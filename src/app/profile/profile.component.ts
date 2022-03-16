import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userFormSubmitted: boolean = false;
  userForm = new FormGroup({
    firstName: new FormControl('Ujjal', [Validators.required]),
    lastName: new FormControl('Bhaskar', [Validators.required]),
    phoneNumber: new FormControl('9876543212', [
      Validators.required,
      Validators.min(1000000000),
      Validators.max(9999999999)
    ]),
    dob: new FormControl('05/04/1991', [Validators.required]),
    gender: new FormControl('male', [Validators.required]),
    address: new FormControl('ABC Street, Kolkata, 700001', [Validators.required]),
  })
  constructor() { }

  ngOnInit(): void {
  }

  submitForm() {
    this.userFormSubmitted = true;
  }
}
