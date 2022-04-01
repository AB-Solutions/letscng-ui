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
import { ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from  'ng-otp-input';
import { HttpClientModule } from '@angular/common/http';

// import Firebase
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LoadingIconComponent } from './loading-icon/loading-icon.component';
import { MyRidesComponent } from './aw80d/my-rides/my-rides.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { BannerComponent } from './home/banner/banner.component';
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
    AdminHomeComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
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
