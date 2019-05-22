import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';


import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private AuthService: AuthService,
    private Router: Router,
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }
  loginok() {
    return this.AuthService.loginState();
  }

  goToAddTemplo() {
    this.menu.close('custom').then(() => {
      this.Router.navigate(['/add-temple1']);
    })
  }

  logOut() {
    this.menu.close('custom').then(() => {
      this.AuthService.logOut();
    })
  }

}
