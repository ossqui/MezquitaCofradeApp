import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authOk: boolean = false;

  constructor(
    private AngularFireAuth: AngularFireAuth,
    private Router: Router
    ) { }

    /**
     * inicia sesión con las credenciales del usuario pasado por parametro.
     * @param email correo de inicio de sesión.
     * @param password contraseña de inicio de sesión.
     */
  login(email:string, password:string):Promise<{}>{
    return new Promise((resolve, rejected) => {
      this.AngularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(answell => {
        this.authOk = true;
        resolve(answell);
      })
      .catch(error => {
        this.authOk = false;
        rejected(error);
      });
    });
  }

  /**
   * Desloguea al usuario con la sesión iniciada.
   */
  logOut(): void{
    this.AngularFireAuth.auth.signOut().then(()=>{
      this.Router.navigate(['/login']);
      this.authOk = false;
    })
    .catch(()=>{
      this.authOk = true;
      alert('No se ha podido cerrar la sesión');
    });
  }
  loginState(){
    return this.authOk;
  }
}
