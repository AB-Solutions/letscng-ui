// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyB4HeeYD0Q2jsSgrAh7wF2Ib8hBu5u-YGk",
    authDomain: "letscng-ui.firebaseapp.com",
    projectId: "letscng-ui",
    storageBucket: "letscng-ui.appspot.com",
    messagingSenderId: "1070710859649",
    appId: "1:1070710859649:web:c6a93ca4e69bf35bf5aa80",
    measurementId: "G-GN0E3C4ENN"
  },
  stravaConfig: {
    base_url: 'https://www.strava.com',
    client_id: 69720,
    client_secret: '351a9455b693ef8d71cd00e960860900a68c54df',
    refresh_token: 'ea9720aa8937fffa61c43900e1f1b6e3d82ec0ee',
    access_token: '429fc45166bc9ccdb9ee2030f0e0a060d6a20710',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
