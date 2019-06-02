import { ConectService } from './../../../services/conect.service';
import { AuthService } from './../../../services/auth.service';
import { DataService } from './../../../services/data.service';
import { TempleService } from './../../../services/temple.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { isNullOrUndefined } from 'util';
import { AlertController, LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

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
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private AuthService: AuthService,
    private translate: TranslateService,
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
      this.presentAlertSimple(this.translate.instant('addTemplefalse'), this.translate.instant('imageMandatory') , this.translate.instant('ok'));
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
      message: this.translate.instant('savingTemple'),
    });
    return await loading.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: this.translate.instant('addTemple'),
      message: this.translate.instant('addTempleMsg'),
      buttons: [
        {
          text: this.translate.instant('cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.presentToast(this.translate.instant('addTemplefalse'));
            return false;
          }
        }, {
          text: this.translate.instant('ok'),
          handler: () => {
            this.presentLoadingWithOptions();
            this.TempleService.returnTemple(this.image).then(temple => {
              this.DataService.addTemple(temple).then(() => {
                this.loadingController.dismiss();
                this.Router.navigate(['/home']);
                this.presentToast(this.translate.instant('addTempleTrue'))
              }).catch(() => {
                this.loadingController.dismiss();
                this.presentToast(this.translate.instant('addTemplefalse'));
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

  openCapture() {
    this.presentActionSheet();
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.instant('addImage'),
      buttons: [{
        text: this.translate.instant('camera'),
        icon: 'camera',
        handler: () => {
          this.photographic();
        }
      }, {
        text: this.translate.instant('gallery'),
        icon: 'folder',
        handler: () => {
          this.gallery();
        }
      }, {
        text: this.translate.instant('cancel'),
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
