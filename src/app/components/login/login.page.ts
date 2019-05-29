import { ModalController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { RecoverPasswordComponent } from '../recover-password/recover-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private ModalController: ModalController
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
      });
  }

  openTemple() {
    this.ModalController.create({
      component: RecoverPasswordComponent
    }).then((modal) => modal.present())
      .catch(() => { })
  }

}
