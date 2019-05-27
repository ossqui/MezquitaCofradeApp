import { Carved } from './../../model/carved';
import { DataService } from './../../services/data.service';
import { AuthService } from './../../services/auth.service';
import { ModalController, NavParams } from '@ionic/angular';
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
  carvedList: Carved[]= [];

  constructor(
    private camera: Camera,
    private ModalController: ModalController,
    private NavParams: NavParams,
    private AuthService: AuthService,
    private DataService: DataService
  ) { }

  ngOnInit() {
    this.temple = this.NavParams.get('temple');
    this.DataService.getImagesTemple(this.temple.id).then(imagesGallery =>{
     this.listImages = imagesGallery;
    });
    this.DataService.getCarvedTemple(this.temple.id).then(carvedCollection =>{
      this.carvedList = carvedCollection;
    })
  }

  closeModal() {
    this.ModalController.dismiss();
  }

  galleryisNull(){
    if(this.listImages.length>0){
      return true;
    }else{
      return false;
    }
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
        idFather: this.temple.id,
        code: 'data:image/jpeg;base64,' + imageData
      }
      this.DataService.addImageGallery(image);
      this.DataService.getImagesTemple(this.temple.id).then(imagesGallery =>{
        this.listImages = imagesGallery;
       })

    }, (err) => {
      console.log(err);
    });
  }


  permisions() {
    if ((this.AuthService.returnPermisions() == "2") || (this.AuthService.returnPermisions() == "3")) {
      return true;
    } else {
      return false;
    }
  }
}
