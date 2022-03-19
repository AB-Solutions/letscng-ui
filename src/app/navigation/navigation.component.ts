import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isUserLoggedIn = false;
  userData: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userData = this.authService.getLoggedUser();

    if (this.userData.user) {
      this.isUserLoggedIn = true;
    } else {
      this.logoutUser();
    }

    console.log('this.userData: ', this.userData);

    this.authService.loggedUser.subscribe((loggedIn) => {
      this.isUserLoggedIn = loggedIn;

      if (!this.isUserLoggedIn) {
        this.logoutUser();
      }
    });

  }

  logoutUser() {
    this.userData = {};
    this.isUserLoggedIn = false;
    this.authService.logoutUser();
  }

}
