import { Carved } from './../model/carved';

import { imageGallery } from './../model/imageGallery';
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { Temple } from '../model/temple';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

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

  getImages(uid: string) {
    let imagesGallery: imageGallery[] = [];
    return new Promise<imageGallery[]>((resolve, rejected) => {
      this.AngularFirestore.collection(environment.firebaseConfig.imagesGallery).ref.where("idFather", "==", uid).get()
        .then(images => {
          images.docs.forEach(image => {
            const img: imageGallery = image.data();
            img.id = image.id;
            imagesGallery.push(img);
          });
          resolve(imagesGallery);
        })
        .catch(err => rejected(err));
    })
  }

  getCarvedTemple(temple: string) {
    let carvedCollection: Carved[] = [];
    return new Promise<Carved[]>((resolve, rejected) => {
      this.AngularFirestore.collection(environment.firebaseConfig.carved).ref.where("temple", "==", temple).get()
        .then(images => {
          images.docs.forEach(image => {
            const img: imageGallery = image.data();
            img.id = image.id;
            carvedCollection.push(img);
          });
          resolve(carvedCollection);
        })
        .catch(err => rejected(err));
    })
  }

  addImageGallery(image: imageGallery) {
    return this.AngularFirestore.collection(environment.firebaseConfig.imagesGallery).add(image);
  }

  addCarved(carved: Carved) {
    return this.AngularFirestore.collection(environment.firebaseConfig.carved).add(carved);
  }

  deleteTemple(id: string) {
    //recupero la lista de tallas de un templo
    this.getCarvedTemple(id).then(Carved => {
      //recorro la lista de tallas de una en una y las elimino
      Carved.forEach(carved => {
        //recupero la lista de imagenes de la galería de la talla
        this.getImages(carved.id).then(imagesCarved => {
          //recorro la lista de la galería de la talla y las elimino de una en una
          imagesCarved.forEach(image => {
            console.log("imagen de talla");
            this.deleteImage(image.id);
          });
        });
        console.log("talla");
        this.deleteCarved(carved.id);
      });
    });
    //obtengo la lista de imagenes de la galería del templo
    this.getImages(id).then(imagesTemple => {
      //recorro la lista de imagenes de una en una y las elimino
      imagesTemple.forEach(image => {
        console.log("imagen de templo");
        this.deleteImage(image.id);
      });
    });
    console.log("templo");
    return new Promise<boolean>((resolve, rejected) => {
      this.AngularFirestore.collection(environment.firebaseConfig.templeCollection).doc(id).delete()
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          rejected(false);
        })
    });
  }

  deleteCarved(id: string) {
    return new Promise<boolean>((resolve, rejected) => {
      this.AngularFirestore.collection(environment.firebaseConfig.carved).doc(id).delete()
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          rejected(false);
        })
    });
  }

  deleteImage(id: string) {
    return new Promise<boolean>((resolve, rejected) => {
      this.AngularFirestore.collection(environment.firebaseConfig.imagesGallery).doc(id).delete()
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          rejected(false);
        })
    });
  }
}
