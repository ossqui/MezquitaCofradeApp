import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConectService {
  myobservable;
  myobserver;
  myobservable2;
  myobserver2;



  constructor() {
    this.myobservable = new Observable((observer) => {
      this.myobserver = observer;
    });
    this.myobservable2 = new Observable((observer) => {
      this.myobserver2 = observer;
    });
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
