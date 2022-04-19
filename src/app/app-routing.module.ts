import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CngEventsComponent } from './cng-events/cng-events.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyStravaComponent } from './my-strava/my-strava.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: "",
    pathMatch: "full"
  },
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: LoginComponent,
    path: 'login',
  },
  // {
  //   component: ProfileComponent,
  //   path: 'profile',
  // },
  {
    component: MyStravaComponent,
    path: 'strava',
  },
  {
    component: CngEventsComponent,
    path: 'cng-events',
  },
  {
    component: CngEventsComponent,
    path: 'aw80d',
  },
  {
    path: '**',
    redirectTo: "",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
