import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isUserLoggedIn = false;
  currentUrl: string = '';
  userData: any;

  @ViewChild('navbar') navbar: ElementRef<HTMLElement> | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  triggerNavbarClose() {
    let el: HTMLElement | undefined = this.navbar?.nativeElement;
    el?.click();
  }

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

    this.router.events.subscribe((change: any) => {
      if (change instanceof NavigationStart) {
        console.log('change : ', change);
        if (change.url !== this.currentUrl) {
          this.triggerNavbarClose();
          console.log('now close items');
        }
        this.currentUrl = change.url;
      }

    })
  }

  logoutUser() {
    this.userData = {};
    this.isUserLoggedIn = false;
    this.authService.logoutUser();
  }

}
