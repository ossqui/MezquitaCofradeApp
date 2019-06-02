import { ConectService } from './services/conect.service';
import { UserComponent } from './components/user/user.component';
import { Platform, ToastController, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';


import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { user } from './model/user';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  checked: boolean = false;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private AuthService: AuthService,
    private Router: Router,
    private toastController: ToastController,
    private ModalController: ModalController,
    private alertController: AlertController,
    private translate: TranslateService,
    private ConectService: ConectService
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translate.addLangs(environment.currentLanguages);
      this.translate.setDefaultLang(environment.defaultLanguage);
      if (isNullOrUndefined(this.AuthService.getLang())) this.AuthService.setLang(environment.defaultLanguage);

      this.translate.use(this.AuthService.getLang());
      if (this.AuthService.getLang() == "en") {
        this.checked = true;
      } else {
        this.checked = false;
      }
    });

  }

  /**
   * Cambia el leguaje de la aplicación
   */
  changeLang(e) {
    if (e.detail.checked) {
      this.AuthService.setLang("en");
      this.translate.use("en");
      this.ConectService.sendMessage2(true);
    } else {
      this.AuthService.setLang("es");
      this.translate.use("es");
      this.ConectService.sendMessage2(true);
    }
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
      header: this.translate.instant('logOut'),
      message: this.translate.instant('msgCloseSession'),
      buttons: [
        {
          text: this.translate.instant('cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.presentToast(this.translate.instant('closeSessionFalse'));
            return false;
          }
        }, {
          text: this.translate.instant('ok'),
          handler: () => {
            this.menu.close('custom').then(() => {
              this.AuthService.logOut();
              this.presentToast(this.translate.instant('closeSessionTrue'));
            })
          }
        }
      ]
    });
    await alert.present();
  }
}
