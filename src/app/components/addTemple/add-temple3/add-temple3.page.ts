import { Temple } from 'src/app/model/temple';
import { DataService } from './../../../services/data.service';
import { TempleService } from './../../../services/temple.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { isNullOrUndefined } from 'util';
import { AlertController, LoadingController } from '@ionic/angular';
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
    private alertController: AlertController
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
    this.TempleService.returnTemple(this.image).then(temple => {
      this.DataService.addTemple(temple).then(()=>{
        this.presentAlertButton("Templo añadido","Se ha añadido el templo correctamente","Aceptar");
      }).catch(()=>{
        this.presentAlertSimple("Templo no añadido","No se ha añadido el templo por algun error.","Aceptar");
      });
    });
  }

  disableButton() {
    return isNullOrUndefined(this.image);
  }

  async presentAlertButton(messageHeader: string, message: string, textButton: string): Promise<void> {
    const alert = await this.alertController.create({
      header: messageHeader,
      message: message,
      buttons: [{
        text: textButton,
        handler: () => {
          this.Router.navigate(['/home']);
        }
      }]
    });
    await alert.present();
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
}
