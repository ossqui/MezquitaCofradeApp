// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAfskEXSdkd-810uwC9Bd37FKQIGA8s9H0",
    authDomain: "mezquitacofrade.firebaseapp.com",
    databaseURL: "https://mezquitacofrade.firebaseio.com",
    projectId: "mezquitacofrade",
    storageBucket: "mezquitacofrade.appspot.com",
    messagingSenderId: "1030917506986",
    templeCollection: "temple",
    imagenesColeccion: "imagenes",
    usuarios: "usuarios"
  },

  currentLanguages: ['es', 'en'], //idiomas disponibles de la aplicación
  defaultLanguage: "es", //idioma por defecto
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
