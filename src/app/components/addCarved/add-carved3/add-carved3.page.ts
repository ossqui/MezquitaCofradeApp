import { AuthService } from './../../../services/auth.service';
import { ConectService } from './../../../services/conect.service';
import { isNullOrUndefined } from 'util';
import { DataService } from './../../../services/data.service';
import { AlertController, LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarvedService } from './../../../services/carved.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

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
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private translate: TranslateService,
    private AuthService: AuthService,
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
    } else {
      this.presentAlertSimple(this.translate.instant('important'), this.translate.instant('imageMandatory'), this.translate.instant('ok'));
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
      message: this.translate.instant('savingCarved'),
    });
    return await loading.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: this.translate.instant('addCarved'),
      message: this.translate.instant('addCarvedMsg'),
      buttons: [
        {
          text: this.translate.instant('cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.presentToast(this.translate.instant('addCarvedFalse'));
            return false;
          }
        }, {
          text: this.translate.instant('ok'),
          handler: () => {
            this.presentLoadingWithOptions();
            this.CarvedService.returnCarved(this.image).then(carved => {
              this.DataService.addCarved(carved).then(() => {
                this.loadingController.dismiss();
                this.Router.navigate(['/home']);
                this.presentToast(this.translate.instant('savingTemple'))
              }).catch(() => {
                this.loadingController.dismiss();
                this.presentToast(this.translate.instant('addCarvedFalse'));
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
