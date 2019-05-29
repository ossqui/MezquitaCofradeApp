import { ConectService } from './../../services/conect.service';
import { CarvedComponent } from './../carved/carved.component';
import { Carved } from './../../model/carved';
import { DataService } from './../../services/data.service';
import { AuthService } from './../../services/auth.service';
import { ModalController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Temple } from 'src/app/model/temple';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { imageGallery } from 'src/app/model/imageGallery';

@Component({
  selector: 'app-temple',
  templateUrl: './temple.component.html',
  styleUrls: ['./temple.component.scss'],
})
export class TempleComponent implements OnInit {
  listImages: imageGallery[] = [];
  temple: Temple;
  carvedList: Carved[] = [];

  constructor(
    private camera: Camera,
    private ModalController: ModalController,
    private NavParams: NavParams,
    private AuthService: AuthService,
    private DataService: DataService,
    private ConectService: ConectService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.ConectService.getMessage().subscribe(answell => {
      if (answell) {
        this.DataService.getCarvedTemple(this.temple.id).subscribe(carvedCollection => {
          this.carvedList = carvedCollection;
        })
      }
    })
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

  ngOnInit() {
    this.temple = this.NavParams.get('temple');
    this.DataService.getImages(this.temple.id).then(imagesGallery => {
      this.listImages = imagesGallery;
    });
    this.DataService.getCarvedTemple(this.temple.id).subscribe(carvedCollection => {
      this.carvedList = carvedCollection;
    })
  }

  closeModal() {
    this.ModalController.dismiss();
  }

  galleryisNull() {
    if (this.listImages.length > 0) {
      return true;
    } else {
      return false;
    }
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

  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar templo',
      message: '¿Estas seguro de eliminar el templo?. Se eliminarán todos los datos incluidas sus tallas y galerías.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.presentToast("No se eliminó el templo");
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.ModalController.dismiss()
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
}
