import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

    if(el?.getAttribute('aria-expanded') === 'true') {
      el?.click();
    }
  }

  ngOnInit(): void {
    this.userData = this.authService.getLoggedUser();

    if (this.userData.user) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }

    this.authService.loggedUser.subscribe((loggedIn) => {
      this.isUserLoggedIn = loggedIn;

      if (!this.isUserLoggedIn) {
        // this.logoutUser();
      }
    });

    this.router.events.subscribe((change: any) => {
      if (change instanceof NavigationStart) {
        if (change.url !== this.currentUrl) {
          this.triggerNavbarClose();
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
