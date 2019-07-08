import { ConectService } from './../../services/conect.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, Platform, MenuController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { RecoverPasswordComponent } from '../recover-password/recover-password.component';
import { environment } from 'src/environments/environment';

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
    private ModalController: ModalController,
    private translate: TranslateService,
    private menu: MenuController,
    private ConectService: ConectService
  ) {
    this.translate.addLangs(environment.currentLanguages);
      this.translate.use(this.AuthService.getLang());
    this.ConectService.getMessage2().subscribe(() => {
      this.translate.use(this.AuthService.getLang());
    })

  }

  ngOnInit() {
  }

  login() {
    this.AuthService.login(this.email, this.password)
      .then((answell) => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        alert(this.translate.instant('noLogin'));
      });
  }

  openTemple() {
    this.ModalController.create({
      component: RecoverPasswordComponent
    }).then((modal) => modal.present())
      .catch(() => { })
  }

}
