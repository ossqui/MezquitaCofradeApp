import { AuthService } from './../../../services/auth.service';
import { ConectService } from './../../../services/conect.service';
import { CarvedService } from './../../../services/carved.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-carved1',
  templateUrl: './add-carved1.page.html',
  styleUrls: ['./add-carved1.page.scss'],
})
export class AddCarved1Page implements OnInit {

  private name: string = "";
  private author: string = "";
  private ageOfCarved: string = "";
  private style: string = "";
  private material: string = "";

  private countName: number = 60;
  private countAuthor: number = 40;
  private countAgeOfCarved: number = 20;
  private countStyle: number = 50;
  private countMaterial: number = 40;

  public formCarved: FormGroup;

  constructor(
    private Router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private CarvedService: CarvedService,
    private translate: TranslateService,
    private AuthService: AuthService,
    private ConectService: ConectService
  ) {
    this.formCarved = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      ageOfCarved: ['', Validators.required],
      style: ['', Validators.required],
      material: ['', Validators.required],
    });
    this.translate.addLangs(environment.currentLanguages);
    this.translate.use(this.AuthService.getLang());
    this.ConectService.getMessage2().subscribe(() => {
      this.translate.use(this.AuthService.getLang());
    })
  }

  ngOnInit() {
  }

  sizeInputs() {
    this.name = this.formCarved.get('name').value.trim();
    this.author = this.formCarved.get('author').value.trim();
    this.ageOfCarved = this.formCarved.get('ageOfCarved').value.trim();
    this.style = this.formCarved.get('style').value.trim();
    this.material = this.formCarved.get('material').value.trim();
    if (this.name != null) {
      var aux = 60 - this.name.length;
      if (this.countName > aux && aux >= 0) {
        this.countName = aux;
      } else if (this.countName < aux && aux <= 60) {
        this.countName = aux;
      }
    }
    if (this.author != null) {
      var aux = 40 - this.author.length;
      if (this.countAuthor > aux && aux >= 0) {
        this.countAuthor = aux;
      } else if (this.countAuthor < aux && aux <= 40) {
        this.countAuthor = aux;
      }
    }
    if (this.ageOfCarved != null) {
      var aux = 40 - this.ageOfCarved.length;
      if (this.countAgeOfCarved > aux && aux >= 0) {
        this.countAgeOfCarved = aux;
      } else if (this.countAgeOfCarved < aux && aux <= 40) {
        this.countAgeOfCarved = aux;
      }
    }
    if (this.style != null) {
      var aux = 40 - this.style.length;
      if (this.countStyle > aux && aux >= 0) {
        this.countStyle = aux;
      } else if (this.countStyle < aux && aux <= 40) {
        this.countStyle = aux;
      }
    }
    if (this.material != null) {
      var aux = 40 - this.material.length;
      if (this.countMaterial > aux && aux >= 0) {
        this.countMaterial = aux;
      } else if (this.countMaterial < aux && aux <= 40) {
        this.countMaterial = aux;
      }
    }
  }

  savePart1() {
    this.formCarved = this.formBuilder.group({
      name: [this.formCarved.get('name').value.trim(), Validators.required],
      author: [this.formCarved.get('author').value.trim(), Validators.required],
      ageOfCarved: [this.formCarved.get('ageOfCarved').value.trim(), Validators.required],
      style: [this.formCarved.get('style').value.trim(), Validators.required],
      material: [this.formCarved.get('material').value.trim(), Validators.required],
    });
    this.sizeInputs();
    this.CarvedService.part1(
      this.name,
      this.author,
      this.ageOfCarved,
      this.style,
      this.material
    )
      .then(() => {

        this.Router.navigate(['/add-carved2']);

      })
      .catch(() => {

        this.presentAlert(this.translate.instant('important'), this.translate.instant('msgEmpty'), this.translate.instant('ok'));

      })
  }

  resetDate() {
    this.formCarved = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      ageOfCarved: ['', Validators.required],
      style: ['', Validators.required],
      material: ['', Validators.required],
    });
    this.name = "";
    this.author = "";
    this.ageOfCarved = "";
    this.style = "";
    this.material = "";
  }

  async presentAlert(messageHeader: string, message: string, textButton: string): Promise<void> {
    const alert = await this.alertController.create({
      header: messageHeader,
      message: message,
      buttons: [textButton]
    });
    await alert.present();
  }

  /**
   * Cancela todo los datos y redirige a home
   */
  cancel() {
    this.resetDate();
    this.CarvedService.resetCarved();
    this.Router.navigate(['/home']);
  }
}
