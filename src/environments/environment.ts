// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  envName: "local",
  firebaseConfig: {
    apiKey: "AIzaSyBd9AIpEXU-jfkp40JlCi0N34QiqHS7wW0",
    authDomain: "challenge1177.firebaseapp.com",
    databaseURL: "https://challenge1177-default-rtdb.firebaseio.com",
    projectId: "challenge1177",
    storageBucket: "challenge1177.appspot.com",
    messagingSenderId: "59705937323",
    appId: "1:59705937323:web:73d7ba7d7776d4f58a16ee",
    measurementId: "G-CZ87RT5HH8",
  },
  stravaConfig: {
    client_id: 69720,
  },
  backend: {
    apiBaseUrl: "https://letscng-backend-bsx6kqq36q-uc.a.run.app",
    cng_redirect_uri: "https://letcng-ui.web.app/strava",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
