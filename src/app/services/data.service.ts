
import { imageGallery } from './../model/imageGallery';
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { Temple } from '../model/temple';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  temples: any = []

  constructor(
    private AngularFirestore: AngularFirestore
  ) {
  }

  getTemples() {
    return this.AngularFirestore.collection(environment.firebaseConfig.templeCollection).snapshotChanges()
      .pipe(map(rooms => {
        return rooms.map(a => {
          const data = a.payload.doc.data() as Temple;
          data.id = a.payload.doc.id;
          return data;
        })
      }))
  }

  addTemple(temple: Temple) {
    return this.AngularFirestore.collection(environment.firebaseConfig.templeCollection).add(temple);
  }

  getImagesTemple(uid: String) {
    let imagesGallery: imageGallery[] = [];
    return new Promise <imageGallery[]> ((resolve, rejected) => {
      this.AngularFirestore.collection(environment.firebaseConfig.imagesGallery).ref.where("idFather", "==", uid).get()
        .then(images => {
          images.docs.forEach(image => {
            imagesGallery.push(image.data());
          });
          resolve(imagesGallery);
        })
        .catch(err => rejected(err));
    })
  }

  addImageGallery(image: imageGallery){
    return this.AngularFirestore.collection(environment.firebaseConfig.imagesGallery).add(image);
  }
}
