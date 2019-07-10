import { imageGallery } from './../../model/imageGallery';
import { Carved } from './../../model/carved';
import { AlertController, ToastController, ActionSheetController, ModalController } from '@ionic/angular';
import { DataService } from './../../services/data.service';
import { AuthGuard } from './../../guards/auth.guard';
import { AuthService } from './../../services/auth.service';
import { ConectService } from './../../services/conect.service';
import { Temple } from './../../model/temple';
import { CarvedComponent } from './../carved/carved.component';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-temple-info',
  templateUrl: './temple-info.page.html',
  styleUrls: ['./temple-info.page.scss'],
})
export class TempleInfoPage implements OnInit {
  private temple: Temple;
  carvedList: Carved[] = [];
  listImages: imageGallery[] = [];

  constructor(
    private camera: Camera,
    private ModalController: ModalController,
    private ConectService: ConectService,
    private translate: TranslateService,
    private Router: Router,
    private AuthService: AuthService,
    private DataService: DataService,
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
  ) {
    this.temple = this.ConectService.getTemple();

    this.translate.addLangs(environment.currentLanguages);
    this.translate.use(this.AuthService.getLang());
    this.ConectService.getMessage2().subscribe(() => {
      this.translate.use(this.AuthService.getLang());
    });

    this.ConectService.getMessage().subscribe(answell => {
      if (answell) {
        this.DataService.getCarvedTemple(this.temple.id).subscribe(carvedCollection => {
          this.carvedList = carvedCollection;
        })
      }
    })
  }

  ngOnInit() {
    this.DataService.getImages(this.temple.id).then(imagesGallery => {
      this.listImages = imagesGallery;
    });
    this.DataService.getCarvedTemple(this.temple.id).subscribe(carvedCollection => {
      this.carvedList = carvedCollection;
    })
  }

  closePage(){
    this.Router.navigate(['/home']);
  }

  galleryisNull() {
    if (this.listImages.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  gallery() {
    var image: imageGallery;
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
      image = {
        idFather: this.temple.id,
        code: 'data:image/jpeg;base64,' + imageData
      }
      this.DataService.addImageGallery(image);
      this.DataService.getImages(this.temple.id).then(imagesGallery => {
        this.listImages = imagesGallery;
      })

    }, (err) => {
      console.log(err);
    });
  }

  photographic() {
    var image: imageGallery;
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
      image = {
        idFather: this.temple.id,
        code: 'data:image/jpeg;base64,' + imageData
      }
      this.DataService.addImageGallery(image);
      this.DataService.getImages(this.temple.id).then(imagesGallery => {
        this.listImages = imagesGallery;
      })

    }, (err) => {
      console.log(err);
    });
  }

  deleteTemple(id: string) {
    this.presentAlertConfirm(id);
  }

  permisions() {
    if ((this.AuthService.returnPermisions() == "2") || (this.AuthService.returnPermisions() == "3")) {
      return true;
    } else {
      return false;
    }
  }

  carvedsNull(){
    if(this.carvedList.length == 0){
      return true;
    }else{
      return false;
    }
  }

  openCarved(carved: Carved) {
    this.ModalController.create({
      component: CarvedComponent,
      componentProps: {
        carved: carved
      }
    }).then((modal) => modal.present())
  }

  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: this.translate.instant('deleteTemple'),
      message: this.translate.instant('msgDeleteTemple'),
      buttons: [
        {
          text: this.translate.instant('cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.presentToast("No se eliminó el templo");
          }
        }, {
          text: this.translate.instant('ok'),
          handler: () => {
            this.Router.navigate(['/home'])
              .then(() => {
                this.DataService.deleteTemple(id)
                  .then(() => {
                    this.presentToast("Se elimino el templo");
                  })
                  .catch(() => {
                    this.presentToast("No se eliminó el templo");
                  })
              })
              .catch(err => {
                console.log("ha ocurrido un error: " + err);
              })
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
      header: 'Añadir imagen',
      buttons: [{
        text: 'Camara',
        icon: 'camera',
        handler: () => {
          this.photographic();
        }
      }, {
        text: 'Galería',
        icon: 'folder',
        handler: () => {
          this.gallery();
        }
      }, {
        text: 'Cancel',
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
