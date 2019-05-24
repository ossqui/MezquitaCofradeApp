import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  public userForm: FormGroup;

  constructor(
    private AuthService: AuthService,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  signUp() {
    console.log(this.userForm.get('email').value.trim(),
    this.userForm.get('password').value.trim(),
    this.userForm.get('name').value.trim());
    
    this.AuthService.signUp(
      this.userForm.get('email').value.trim(),
      this.userForm.get('password').value.trim(),
      this.userForm.get('name').value.trim(),
      "1"
      )
      .then(ok => {
        this.presentAlert("Usuario creado","La operación se ha realizado con existo.", "Aceptar");
      })
      .catch(err => {
        var msg;
        switch(err.code){
          case "auth/email-already-in-use":
            msg = "El correo electronico introducido ya esta en uso";
            break;
          case "auth/weak-password":
            msg = "La contraseña debe tener al menos seis caracteres";
            break;
          case "auth/invalid-email":
            msg = "El formato del correo no es valido";
          break;
          default:
            msg = "ha ocurrido un error y no se ha creado la cuenta";
        }
        
       this.presentAlert("Usuario no creado",msg,"Aceptar")
      })
  }

  async presentAlert(messageHeader: string, message: string, textButton: string): Promise<void> {
    const alert = await this.alertController.create({
      header: messageHeader,
      message: message,
      buttons: [textButton]
    });
    await alert.present();
  }
}
