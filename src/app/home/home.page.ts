import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private Router: Router,
    private menu: MenuController
  ) { }

  goToAddTemplo() {
    this.Router.navigate(['/add-templo']);
  }

}
