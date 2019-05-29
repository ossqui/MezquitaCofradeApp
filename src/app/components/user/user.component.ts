import { DataService } from './../../services/data.service';
import { AuthService } from './../../services/auth.service';
import { user } from './../../model/user';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  private user: user;
  private edit: boolean = false;
  private name: string;

  constructor(
    private ModalController: ModalController,
    private AuthService: AuthService,
    private DataService: DataService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.user = this.AuthService.returnUser();
    this.name = this.user.name;
  }

  closeModal() {
    this.ModalController.dismiss();
  }
  setData() {
    this.name = this.name.trim();
    if (!isNullOrUndefined(this.name) && !(this.name == "")) {
      this.user.name = this.name;
      this.DataService.setDataUser(this.user).then(() => {
        this.presentToast("Datos del usuario modificados");
      }).catch(()=>{
        this.presentToast("Datos no modificados");
      })
    }else{
      this.presentToast("No se ha introducido ningun valor");
    }

  }
  activeEdit() {
    if (this.edit == true) {
      this.edit = false;
      return
    } else {
      this.edit = true;
    }
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
