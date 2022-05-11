import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { MyStravaComponent } from './my-strava/my-strava.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FooterComponent } from './footer/footer.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { RecaptchaModule } from "ng-recaptcha";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from  'ng-otp-input';
import { HttpClientModule } from '@angular/common/http';

// import Firebase
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LoadingIconComponent } from './loading-icon/loading-icon.component';
import { MyRidesComponent } from './common/my-rides/my-rides.component';
import { StravaProfileComponent } from './my-strava/strava-profile/strava-profile.component';
import { Aw80dComponent } from './cng-events/aw80d/aw80d.component';
import { TeamLeaderboardComponent } from './cng-events/aw80d/team-leaderboard/team-leaderboard.component';
import { MyTeamComponent } from './cng-events/aw80d/my-team/my-team.component';
import { MyEventRidesComponent } from './cng-events/aw80d/my-event-rides/my-event-rides.component';
import { CngEventsComponent } from './cng-events/cng-events.component';
import { ServerDownComponent } from './server-down/server-down.component';
import { EarthSatelliteComponent } from './common/earth-satellite/earth-satellite.component';
import { PlotGraphComponent } from './cng-events/aw80d/plot-graph/plot-graph.component';
import { ChallengeComponent } from './cng-events/aw80d/challenge/challenge.component';
import { TrendsComponent } from './cng-events/aw80d/trends/trends.component';
import { BoosterTableComponent } from './common/booster-table/booster-table.component';
import { TopPerformersLeaderboardComponent } from './cng-events/aw80d/top-performers-leaderboard/top-performers-leaderboard.component';
import { MilestoneComponent } from './common/milestone/milestone.component';
import { TrendGraphComponent } from './common/trend-graph/trend-graph.component';
import { AllTotalGraphComponent } from './common/all-total-graph/all-total-graph.component';
import { UfoComponent } from './ufo/ufo.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    MyStravaComponent,
    FooterComponent,
    LoadingIconComponent,
    MyRidesComponent,
    StravaProfileComponent,
    Aw80dComponent,
    TeamLeaderboardComponent,
    MyTeamComponent,
    MyEventRidesComponent,
    CngEventsComponent,
    ServerDownComponent,
    EarthSatelliteComponent,
    PlotGraphComponent,
    ChallengeComponent,
    TrendsComponent,
    BoosterTableComponent,
    TopPerformersLeaderboardComponent,
    MilestoneComponent,
    TrendGraphComponent,
    AllTotalGraphComponent,
    UfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    Ng2TelInputModule,
    RecaptchaModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgOtpInputModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
