import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  private email: string = "";

  constructor(
    private AuthService: AuthService,
    private alertController: AlertController,
    private ModalController: ModalController,
    private translate: TranslateService
  ) { }

  ngOnInit() { }

  recover() {
    if (this.email.trim() != "") {
      this.AuthService.resetPassword(this.email)
        .then(() => {
          this.presentAlert(this.translate.instant("password"), this.translate.instant("sendEmail"), this.translate.instant("ok"))
            .then(() => {
              this.closeModal();
            })
        })
        .catch(() => {
          this.presentAlert(this.translate.instant("password"), this.translate.instant("errorRecPass"), this.translate.instant("ok"));
        });
    } else {
      this.presentAlert(this.translate.instant("password"), this.translate.instant("errorRecPass"), this.translate.instant("ok"));
    }
  }

  async presentAlert(messageHeader: string, message: string, textButton: string): Promise<void> {
    const alert = await this.alertController.create({
      header: messageHeader,
      message: message,
      buttons: [textButton]
    });
    await alert.present();
  }

  closeModal() {
    this.ModalController.dismiss();
  }
}
