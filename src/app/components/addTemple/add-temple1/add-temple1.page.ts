import { ConectService } from './../../../services/conect.service';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TempleService } from "../../../services/temple.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-temple1',
  templateUrl: './add-temple1.page.html',
  styleUrls: ['./add-temple1.page.scss'],
})
export class AddTemple1Page implements OnInit {
  private name: string = "";
  private type: string = "";
  private ageConstruction: string = "";
  private arquitectonicStyle: string = "";

  private countName: number = 60;
  private countType: number = 50;
  private countAgeConstruction: number = 20;
  private countArquitectonicStyle: number = 50;

  public formTemple: FormGroup;

  constructor(
    private TempleService: TempleService,
    private Router: Router,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private AuthService: AuthService,
    private ConectService: ConectService
  ) {

    this.formTemple = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      ageConstruction: ['', Validators.required],
      arquitectonicStyle: ['', Validators.required],
    });

    this.translate.addLangs(environment.currentLanguages);
    this.translate.use(this.AuthService.getLang());
    this.ConectService.getMessage2().subscribe(() => {
      this.translate.use(this.AuthService.getLang());
    })
  }


  ngOnInit() {
  }

  /**
   * Actualiza los valores del contador de caracteres de las entradas del formulario
   */
  sizeInputs() {
    this.name = this.formTemple.get('name').value.trim();
    this.type = this.formTemple.get('type').value.trim();
    this.ageConstruction = this.formTemple.get('ageConstruction').value.trim();
    this.arquitectonicStyle = this.formTemple.get('arquitectonicStyle').value.trim();
    if (this.name != null) {
      var aux = 60 - this.name.length;
      if (this.countName > aux && aux >= 0) {
        this.countName = aux;
      } else if (this.countName < aux && aux <= 60) {
        this.countName = aux;
      }
    }
    if (this.type != null) {
      var aux = 50 - this.type.length;
      if (this.countType > aux && aux >= 0) {
        this.countType = aux;
      } else if (this.countType < aux && aux <= 50) {
        this.countType = aux;
      }
    }
    if (this.ageConstruction != null) {
      var aux = 20 - this.ageConstruction.length;
      if (this.countAgeConstruction > aux && aux >= 0) {
        this.countAgeConstruction = aux;
      } else if (this.countAgeConstruction < aux && aux <= 20) {
        this.countAgeConstruction = aux;
      }
    }
    if (this.arquitectonicStyle != null) {
      var aux = 50 - this.arquitectonicStyle.length;
      if (this.countArquitectonicStyle > aux && aux >= 0) {
        this.countArquitectonicStyle = aux;
      } else if (this.countArquitectonicStyle < aux && aux <= 50) {
        this.countArquitectonicStyle = aux;
      }
    }
  }

  /**
   * Guarda los datos del formulario en el servicio
   */
  savePart1() {
    this.formTemple = this.formBuilder.group({
      name: [this.formTemple.get('name').value.trim(), Validators.required],
      type: [this.formTemple.get('type').value.trim(), Validators.required],
      ageConstruction: [this.formTemple.get('ageConstruction').value.trim(), Validators.required],
      arquitectonicStyle: [this.formTemple.get('arquitectonicStyle').value.trim(), Validators.required],
    });
    this.sizeInputs();
    if (this.TempleService.part1(this.name, this.type, this.ageConstruction, this.arquitectonicStyle)) {
      this.Router.navigate(['/add-temple2'])
    } else {
      this.presentAlert(this.translate.instant('important'),this.translate.instant('msgEmpty'),this.translate.instant('ok'));
    }
  }

  /**
   * Resetea los valores de los campos del formulario, de las variables internas y de los datos del servicio.
   */
  resetDate(){
    this.formTemple = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      ageConstruction: ['', Validators.required],
      arquitectonicStyle: ['', Validators.required],
    });
    this.name = "";
    this.type = "";
    this.ageConstruction = "";
    this.arquitectonicStyle = "";
    this.TempleService.resetTemple();
  }

  /**
   * Cancela todo los datos y redirige a home
   */
  cancel(){
    this.resetDate();
    this.Router.navigate(['/home']);
  }

  /**
   * Genera un mensaje de alerta con los datos pasados por parametro.
   */
  async presentAlert(messageHeader: string, message: string, textButton: string): Promise<void> {
    const alert = await this.alertController.create({
      header: messageHeader,
      message: message,
      buttons: [textButton]
    });
    await alert.present();
  }
}
