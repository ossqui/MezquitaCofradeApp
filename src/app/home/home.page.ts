import { Temple } from './../model/temple';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { TempleComponent } from '../components/temple/temple.component';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public temples: any = [];
  private username: string;

  constructor(
    private menu: MenuController,
    private DataService: DataService,
    private ModalController: ModalController,
    private loadingController: LoadingController,
    private AuthService: AuthService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.presentLoadingWithOptions();
    this.DataService.getTemples().subscribe(temples => {

      this.temples = temples;
      this.loadingController.dismiss();

    });
    this.AuthService.dateUser();
  }

  openTemple(temple: Temple) {
    this.ModalController.create({
      component: TempleComponent,
      componentProps: {
        temple: temple
      }
    }).then((modal) => modal.present())
      .catch(() => { })
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      duration: 5000,
      message: 'Cargando templos',
    });
    return await loading.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Sesión iniciada con " + this.username,
      duration: 2000
    });
    toast.present();
  }
}
