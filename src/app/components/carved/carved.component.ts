import { ConectService } from './../../services/conect.service';
import { AuthService } from './../../services/auth.service';
import { DataService } from './../../services/data.service';
import { Carved } from './../../model/carved';
import { ModalController, NavParams } from '@ionic/angular';
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
    private ConectService: ConectService
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
    this.ModalController.dismiss()
      .then(() => {
        this.DataService.deleteCarved(id)
          .then(() => {
            console.log("Talla eliminada");
            this.ConectService.sendMessage(true);
          })
          .catch(() => {
            console.log("Talla no eliminada");
          })
      })
      .catch(err => {
        console.log("ha ocurrido un error"+err);
      })
  }
}
