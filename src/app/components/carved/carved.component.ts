import { ConectService } from './../../services/conect.service';
import { AuthService } from './../../services/auth.service';
import { DataService } from './../../services/data.service';
import { Carved } from './../../model/carved';
import { ModalController, NavParams, AlertController, ToastController, ActionSheetController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { imageGallery } from './../../model/imageGallery';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-carved',
  templateUrl: './carved.component.html',
  styleUrls: ['./carved.component.scss'],
})
export class CarvedComponent implements OnInit {
  carved: Carved;
  listImages: imageGallery[] = [];

  constructor(
    private camera: Camera,
    private ModalController: ModalController,
    private NavParams: NavParams,
    private DataService: DataService,
    private AuthService: AuthService,
    private ConectService: ConectService,
    private alertController:AlertController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.carved = this.NavParams.get('carved');
    this.DataService.getImages(this.carved.id)
    .then(images => {
      this.listImages = images;
    })
  }

  closeModal() {
    this.ModalController.dismiss();
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
        idFather: this.carved.id,
        code: 'data:image/jpeg;base64,' + imageData
      }
      this.DataService.addImageGallery(image);
      this.DataService.getImages(this.carved.id).then(imagesGallery =>{
        this.listImages = imagesGallery;
       })

    }, (err) => {
      console.log(err);
    });
  }

  photographic() {
    var image:imageGallery;
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
        idFather: this.carved.id,
        code: 'data:image/jpeg;base64,' + imageData
      }
      this.DataService.addImageGallery(image);
      this.DataService.getImages(this.carved.id).then(imagesGallery =>{
        this.listImages = imagesGallery;
       })

    }, (err) => {
      console.log(err);
    });
  }

  galleryisNull(){
    if(this.listImages.length>0){
      return true;
    }else{
      return false;
    }
  }

  permisions() {
    if ((this.AuthService.returnPermisions() == "2") || (this.AuthService.returnPermisions() == "3")) {
      return true;
    } else {
      return false;
    }
  }

  deleteCarved(id: string) {
    this.presentAlertConfirm(id);
  }

  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar talla',
      message: '¿Estas seguro de eliminar la talla?. Se eliminarán todos los datos y su galería.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.presentToast("No se eliminó la talla");
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.ModalController.dismiss()
              .then(() => {
                this.DataService.deleteTemple(id)
                  .then(() => {
                    this.presentToast("Se elimino la talla");
                  })
                  .catch(() => {
                    this.presentToast("No se eliminó la talla");
                  })
              })
              .catch(err => {
                console.log("ha ocurrido un error" + err);
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
