import { AuthService } from './../../../services/auth.service';
import { ConectService } from './../../../services/conect.service';
import { DataService } from './../../../services/data.service';
import { Temple } from 'src/app/model/temple';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarvedService } from './../../../services/carved.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-carved2',
  templateUrl: './add-carved2.page.html',
  styleUrls: ['./add-carved2.page.scss'],
})
export class AddCarved2Page implements OnInit {
  private brotherhood: string = "";
  private processionDay: string = "";
  private description = "";
  private temple = "";

  private countbrotherhood: number = 100;
  private countProcessionDay: number = 40;
  private countDescription: number = 2500;

  private listTemples: Temple[];

  public formCarved: FormGroup;

  constructor(
    private Router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private CarvedService: CarvedService,
    private DataService: DataService,
    private translate: TranslateService,
    private AuthService: AuthService,
    private ConectService: ConectService
  ) {
    this.formCarved = this.formBuilder.group({
      brotherhood: ['', Validators.required],
      processionDay: ['', Validators.required],
      description: ['', Validators.required],
      temple: ['', Validators.required],
    });
    this.translate.addLangs(environment.currentLanguages);
    this.translate.use(this.AuthService.getLang());
    this.ConectService.getMessage2().subscribe(() => {
      this.translate.use(this.AuthService.getLang());
    })
  }

  ngOnInit() {
    this.DataService.getTemples().subscribe(temples => {
      this.listTemples = temples;
    })
  }
  sizeInputs() {
    this.brotherhood = this.formCarved.get('brotherhood').value.trim();
    this.processionDay = this.formCarved.get('processionDay').value.trim();
    this.description = this.formCarved.get('description').value.trim();
    this.temple = this.formCarved.get('temple').value.trim();

    if (this.brotherhood != null) {
      var aux = 100 - this.brotherhood.length;
      if (this.countbrotherhood > aux && aux >= 0) {
        this.countbrotherhood = aux;
      } else if (this.countbrotherhood < aux && aux <= 100) {
        this.countbrotherhood = aux;
      }
    }
    if (this.processionDay != null) {
      var aux = 40 - this.processionDay.length;
      if (this.countProcessionDay > aux && aux >= 0) {
        this.countProcessionDay = aux;
      } else if (this.countProcessionDay < aux && aux <= 40) {
        this.countProcessionDay = aux;
      }
    }
    if (this.description != null) {
      var aux = 2500 - this.description.length;
      if (this.countDescription > aux && aux >= 0) {
        this.countDescription = aux;
      } else if (this.countDescription < aux && aux <= 2500) {
        this.countDescription = aux;
      }
    }
  }

  savePart2() {
    this.sizeInputs();
    this.formCarved = this.formBuilder.group({
      brotherhood: [this.formCarved.get('brotherhood').value.trim(), Validators.required],
      processionDay: [this.formCarved.get('processionDay').value.trim(), Validators.required],
      description: [this.formCarved.get('description').value.trim(), Validators.required],
      temple: [this.formCarved.get('temple').value.trim(), Validators.required],
    });
    this.CarvedService.part2(this.brotherhood, this.processionDay, this.description, this.temple)
      .then(() => {
        this.Router.navigate(['/add-carved3']);
      })
      .catch(() => {
        this.presentAlert("Importante", "No se puede rellenar campos unicamente con espacios o mas caracteres de lo permitido", "Aceptar");
      })
  }

  resetDate() {
    this.formCarved = this.formBuilder.group({
      brotherhood: ['', Validators.required],
      processionDay: ['', Validators.required],
      description: ['', Validators.required],
      temple: ['', Validators.required],
    });
    this.brotherhood = "";
    this.processionDay = "";
    this.description = "";
    this.temple = "";
  }

  /**
   * Cancela todo los datos y redirige a home
   */
  cancel() {
    this.resetDate();
    this.CarvedService.resetCarved();
    this.Router.navigate(['/home']);
  }

  async presentAlert(messageHeader: string, message: string, textButton: string): Promise<void> {
    const alert = await this.alertController.create({
      header: messageHeader,
      message: message,
      buttons: [textButton]
    });
    await alert.present();
  }

}
