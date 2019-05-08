import { Component, OnInit } from '@angular/core';

import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(private actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones de usuario',
      cssClass: 'opcionesUsuario',
      buttons: [{
        text: 'Crear nuevo usuario',
        // icon: 'md-add-circle',
        cssClass: 'creaUsuario',
        handler: () => {
          console.log('Crear usuario sin definir');
        }
      }, {
        text: 'Recuperar contraseña',
        cssClass: 'recuUsuario',
        // icon: 'md-at',
        handler: () => {
          console.log('Recuperar clave sin definir');
        }
      }, {
        text: 'Cancelar',
        // icon: 'close',
        cssClass: 'cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
