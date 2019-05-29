import { UserComponent } from './components/user/user.component';
import { Platform, ToastController, ModalController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';


import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { user } from './model/user';

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
    private toastController: ToastController,
    private ModalController: ModalController
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentToast(name: string) {
    const toast = await this.toastController.create({
      message: 'Sesion iniciada con ' + name,
      duration: 2000
    });
    toast.present();
  }

  loginok() {
    return this.AuthService.loginState();
  }

  goToAddTemplo() {
    this.menu.close('custom').then(() => {
      this.Router.navigate(['/add-temple1']);
    });
  }

  goToAddCarved() {
    this.menu.close('custom').then(() => {
      this.Router.navigate(['/add-carved1']);
    });
  }

  openUserDate() {
    this.menu.close().then(() => {
      this.ModalController.create({
        component: UserComponent
      }).then((modal) => modal.present());
    });
  }

  logOut() {
    this.menu.close('custom').then(() => {
      this.AuthService.logOut();
    })
  }

  permisionsEditUser() {
    if ((this.AuthService.returnPermisions() == "2") || (this.AuthService.returnPermisions() == "3")) {
      return true;
    } else {
      return false;
    }
  }

  permisionsAdminUser() {
    if ((this.AuthService.returnPermisions() == "3")) {
      return true;
    } else {
      return false;
    }
  }
}
