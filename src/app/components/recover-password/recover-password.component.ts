import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';

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
    private ModalController: ModalController
  ) { }

  ngOnInit() { }

  recover() {
    if (this.email.trim() != "") {
      this.AuthService.resetPassword(this.email)
        .then(() => {
          this.presentAlert("Contraseña", "Se ha enviado un correo de recuperación", "Aceptar").then(() => {
            this.closeModal();
          })
        })
        .catch(() => {
          this.presentAlert("Contraseña", "Error al recuperar la contraseña", "Aceptar");
        });
    } else {
      this.presentAlert("Contraseña", "Error al recuperar la contraseña", "Aceptar");
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
