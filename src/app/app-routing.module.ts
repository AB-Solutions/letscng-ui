import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
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
  }, {
    component: LoginComponent,
    path: 'login',
  }, {
    component: MyStravaComponent,
    path: 'strava',
  }, {
    component: AdminHomeComponent,
    path: 'admin',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
