import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    private actionSheetController: ActionSheetController,
    private AuthService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.AuthService.login(this.email, this.password)
      .then((answell) => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        alert('Los datos de inicio de sesión son incorrectos');
        console.log(error);
      });
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

          const myObj = {
            name: 'Skip',
            age: 2,
            favoriteFood: 'Steak'
          };

          const myObjStr = JSON.stringify(myObj);

          console.log(myObjStr);
          // "{"name":"Skip","age":2,"favoriteFood":"Steak"}"

          console.log(JSON.parse(myObjStr));
          // Object {name:"Skip",age:2,favoriteFood:"Steak"}

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
