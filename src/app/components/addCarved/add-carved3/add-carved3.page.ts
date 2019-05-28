import { isNullOrUndefined } from 'util';
import { DataService } from './../../../services/data.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarvedService } from './../../../services/carved.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-carved3',
  templateUrl: './add-carved3.page.html',
  styleUrls: ['./add-carved3.page.scss'],
})
export class AddCarved3Page implements OnInit {
  private image = "";

  constructor(
    private camera: Camera,
    private CarvedService: CarvedService,
    private Router: Router,
    private alertController: AlertController,
    private DataService: DataService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  gallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 200,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      console.log(err);
    });
  }

  photographic() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetWidth: 200,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      console.log(err);
    });
  }

  saveCarved() {
    if (!isNullOrUndefined(this.image)) {
      this.presentAlertConfirm()
    }else{
      this.presentAlertSimple("Talla no añadida", "La imagen principal es obligatoria", "Aceptar");
    }
  }

  resetDate() {
    this.image = "";
  }

  /**
   * Cancela todo los datos y redirige a home
   */
  cancel() {
    this.resetDate();
    this.CarvedService.resetCarved();
    this.Router.navigate(['/home']);
  }

  disableButton() {
    return isNullOrUndefined(this.image);
  }


  async presentAlertSimple(messageHeader: string, message: string, textButton: string): Promise<void> {
    const alert = await this.alertController.create({
      header: messageHeader,
      message: message,
      buttons: [textButton]
    });
    await alert.present();
  }

  async presentLoadingWithOptions(): Promise<void> {
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      duration: 5000,
      message: 'Guardando talla...',
    });
    return await loading.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Añadir templo',
      message: '¿Estas seguro de añadir el templo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.presentToast("No se añadió el templo");
            return false;
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.presentLoadingWithOptions();
            this.CarvedService.returnCarved(this.image).then(carved => {
              this.DataService.addCarved(carved).then(() => {
                this.loadingController.dismiss();
                this.Router.navigate(['/home']);
                this.presentToast("Talla añadida.")
              }).catch(() => {
                this.loadingController.dismiss();
                this.presentToast("Talla no añadida");
              });
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
}
