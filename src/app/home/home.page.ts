import { Temple } from './../model/temple';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, LoadingController } from '@ionic/angular';
import { TempleComponent } from '../components/temple/temple.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public temples: any = [];

  constructor(
    private menu: MenuController,
    private DataService: DataService,
    private ModalController: ModalController,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.presentLoadingWithOptions();
    this.DataService.getTemples().subscribe(temples => {

      this.temples = temples;
      this.loadingController.dismiss();

    })
  }

  openTemple(temple:Temple){
    this.ModalController.create({
      component: TempleComponent,
      componentProps : {
        temple: temple
      }
    }).then((modal) => modal.present())
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      duration: 5000,
      message: 'Guardando templo...',
    });
    return await loading.present();
  }
}
