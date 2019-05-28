import { DataService } from './../../../services/data.service';
import { TempleService } from './../../../services/temple.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { isNullOrUndefined } from 'util';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-temple3',
  templateUrl: './add-temple3.page.html',
  styleUrls: ['./add-temple3.page.scss'],
})
export class AddTemple3Page implements OnInit {

  private image: string;

  constructor(
    private camera: Camera,
    private TempleService: TempleService,
    private DataService: DataService,
    private Router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
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

  saveTemple() {
    if (!isNullOrUndefined(this.image)) {
      this.presentAlertConfirm();
    } else {
      this.presentAlertSimple("Templo no añadido", "La imagen principal es obligatoria", "Aceptar");
    }
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
      message: 'Guardando templo...',
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
            this.TempleService.returnTemple(this.image).then(temple => {
              this.DataService.addTemple(temple).then(() => {
                this.loadingController.dismiss();
                this.Router.navigate(['/home']);
                this.presentToast("Templo añadido.")
              }).catch(() => {
                this.loadingController.dismiss();
                this.presentToast("Templo no añadido");
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
