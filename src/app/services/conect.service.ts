import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Temple } from '../model/temple';

@Injectable({
  providedIn: 'root'
})
export class ConectService {
  private myobservable;
  private myobserver;
  private myobservable2;
  private myobserver2;
  private temple: Temple;



  constructor(
    private Router: Router
  ) {
    this.myobservable = new Observable((observer) => {
      this.myobserver = observer;
    });
    this.myobservable2 = new Observable((observer) => {
      this.myobserver2 = observer;
    });
  }

  setTemple(temple: Temple){
    this.temple = temple;
    this.Router.navigate(['/temple-info']);
  }

  getTemple(): Temple{
    return this.temple;
  }

  /**
   * Recibirá un mensaje y lo guardará en una variable
   * @param m mensaje que recibe. Puede ser del cualquier tipo de dato.
   */
  sendMessage(m: any) {
    if (this.myobservable) {
      this.myobserver.next(m);
    }
  }

  sendMessage2(m: any) {
    if(m==true){
      m=false;
    }else{
      m=true;
    }
    if (this.myobservable2) {
      this.myobserver2.next(m);
    }
  }

  /**
   * Devuelve el mensaje guardado en la variable
   * @return Devuelve un observable con el mensaje del servicio sea del tipo que sea.
   */
  getMessage(): Observable<any> {
    return this.myobservable;
  }

  getMessage2(): Observable<any> {
    return this.myobservable2;
  }
}
