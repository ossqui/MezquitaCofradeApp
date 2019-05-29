import { UserComponent } from './components/user/user.component';
import { Platform, ToastController, ModalController, AlertController } from '@ionic/angular';
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
    private ModalController: ModalController,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
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
  goToAdminUsers() {
    this.menu.close('custom').then(() => {
      this.Router.navigate(['admin-users']);
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
    this.presentAlertConfirm();
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

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estas seguro de cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.presentToast("No se cerro la sesión");
            return false;
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.menu.close('custom').then(() => {
              this.AuthService.logOut();
              this.presentToast("Se cerro la sesión");
            })
          }
        }
      ]
    });
    await alert.present();
  }
}
