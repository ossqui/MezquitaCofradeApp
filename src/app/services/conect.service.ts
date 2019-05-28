import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConectService {
  myobservable;
  myobserver;



  constructor() {
    this.myobservable = new Observable((observer) => {
      this.myobserver = observer;
    });
  }


  /**
   * Recibirá un mensaje y lo guardará en una variable
   * @param m mensaje que recibe. Puede ser del cualquier tipo de dato.
   */
  sendMessage(m: any) {
    if (this.myobservable) {
      this.myobserver.next(m);
      //this.myobserver.complete(m);
    }
  }

  /**
   * Devuelve el mensaje guardado en la variable
   * @return Devuelve un observable con el mensaje del servicio sea del tipo que sea.
   */
  getMessage(): Observable<any> {
    return this.myobservable;
  }
}
