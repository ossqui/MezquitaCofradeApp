import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AngularFireAuth: AngularFireAuth) { }

  login(email:string, password:string):Promise<{}>{
    return new Promise((resolve, rejected) => {
      this.AngularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(answell => {
        resolve(answell);
      })
      .catch(error => {
        rejected(error);
      });
    });
  }
}
