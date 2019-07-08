import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { isNullOrUndefined } from 'util';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { user } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  lang: any;
  private logged: boolean = null;
  private user: user = {
    uid: "",
    name: "",
    permisions: "",
    email: ""
  }

  constructor(
    private AngularFireAuth: AngularFireAuth,
    private Router: Router,
    private AngularFirestore: AngularFirestore
  ) { }

  resetPassword(email?: string) {
    if (isNullOrUndefined(email)) {
      return this.AngularFireAuth.auth.sendPasswordResetEmail(this.user.email);
    } else {
      return this.AngularFireAuth.auth.sendPasswordResetEmail(email);
    }
  }

  /**
   * Cambia el lenguaje de la app
   * @param val Es el lenguaje al que se va a cambiar
   * 
   */
  setLang(val) {
    this.lang = val;
  }

   /**
   * Devuelve el lenguaje en el que esta la app
   * @return idioma en el que esta la app
   */
  getLang(): string {
    return this.lang;
  }

  /**
   * inicia sesión con las credenciales del usuario pasado por parametro.
   * @param email correo de inicio de sesión.
   * @param password contraseña de inicio de sesión.
   */
  login(email: string, password: string): Promise<{}> {
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

  /**
   * Desloguea al usuario con la sesión iniciada.
   */
  logOut(): void {
    this.AngularFireAuth.auth.signOut().then(() => {
      this.Router.navigate(['/login']);
    })
      .catch(() => {
        alert('No se ha podido cerrar la sesión');
      });
  }

  loginState() {
    if (isNullOrUndefined(this.logged)) {
      this.dateUser()
        .then(() => {
        })
        .catch(() => {
        })
    }
    return this.logged;
  }

  signUp(user: string, password: string, name: string, permisions: string) {
    return new Promise((resolve, reject) => {
      this.AngularFireAuth.auth.createUserWithEmailAndPassword(user, password).then(res => {
        const uid = res.user.uid;
        const email = res.user.email
        this.AngularFirestore.collection('user').doc(uid).set({
          name: name,
          uid: uid,
          permisions: permisions,
          email: email
        })

        this.Router.navigate(['/login']);
        resolve(res)
      }).catch(err => reject(err))
    })
  }

  returnUser(): user {
    return this.user;
  }

  returnPermisions() {
    return this.user.permisions;
  }

  returnName() {
    return new Promise<string>((resolve, reject) => {
      if (isNullOrUndefined(this.user.name)) {
        return reject(null);
      } else {
        return resolve(this.user.name);
      }
    })
  }

  dateUser() {
    return new Promise((resolve, reject) => {
      this.AngularFireAuth.user.subscribe(user => {
        if (!isNullOrUndefined(user)) {
          this.AngularFirestore.collection('user').doc(user.uid).get().subscribe((d) => {
            this.user = {
              uid: user.uid,
              name: d.data().name,
              permisions: d.data().permisions,
              email: user.email
            }
          })
          this.logged = true;
          return resolve(true);

        } else {
          this.logged = false;
          return reject(false);
        }
      })
    })

  }
}
