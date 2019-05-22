import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private AngularFireAuth: AngularFireAuth,
    private Router: Router
  ) { }

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
    if(this.Router.url=='/login'){
      return false;
    }else{
      return true;
    }
  }
}
