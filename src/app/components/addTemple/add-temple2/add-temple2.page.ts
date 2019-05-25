
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TempleService } from "../../../services/temple.service";
import { isNullOrUndefined } from 'util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-temple2',
  templateUrl: './add-temple2.page.html',
  styleUrls: ['./add-temple2.page.scss'],
})
export class AddTemple2Page implements OnInit {
  public formTemple: FormGroup;

  private description: string;
  private hourOpeningMorning: string;
  private hourClosingMorning: string;
  private hourOpeningAfternoon: string;
  private hourClosingAfternoon: string;

  private countDescription: number = 2500;

  constructor(
    private TempleService: TempleService,
    private Router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {
    this.formTemple = this.formBuilder.group({
      description: ['', Validators.required],
      hourOpeningMorning: ['', Validators.required],
      hourClosingMorning: ['', Validators.required],
      hourOpeningAfternoon: ['', Validators.required],
      hourClosingAfternoon: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  /**
   * Formatea las horas para guardarlas en la base de datos
   */
  formatHour() {
    this.hourOpeningMorning = this.formTemple.get('hourOpeningMorning').value;
    this.hourOpeningMorning = this.hourOpeningMorning.split("T")[1];
    this.hourOpeningMorning = this.hourOpeningMorning.substring(0, 5);

    this.hourClosingMorning = this.formTemple.get('hourClosingMorning').value;
    this.hourClosingMorning = this.hourClosingMorning.split("T")[1];
    this.hourClosingMorning = this.hourClosingMorning.substring(0, 5);

    this.hourOpeningAfternoon = this.formTemple.get('hourOpeningAfternoon').value;
    this.hourOpeningAfternoon = this.hourOpeningAfternoon.split("T")[1];
    this.hourOpeningAfternoon = this.hourOpeningAfternoon.substring(0, 5);

    this.hourClosingAfternoon = this.formTemple.get('hourClosingAfternoon').value;
    this.hourClosingAfternoon = this.hourClosingAfternoon.split("T")[1];
    this.hourClosingAfternoon = this.hourClosingAfternoon.substring(0, 5);
  }

  /**
   * Guarda los datos en el servicio y a su vez, en la base de datos.
   */
  savePart2() {
    this.formatHour();
    if (this.checkHourMorning() && this.checkHourAfternoon()) {
      this.TempleService.part2(
        this.formTemple.get('description').value.trim(),
        this.hourOpeningMorning,
        this.hourClosingMorning,
        this.hourOpeningAfternoon,
        this.hourClosingAfternoon
      ).then(() => {
        this.Router.navigate(['/add-temple3']);
      }).catch(() =>{
        this.presentAlertNoAction("Error en el formulario", "Has introducido un valor no correcto", "Aceptar");
      });
    } else {
      this.presentAlertNoAction("Error en el horario", "Las horas de apertura no pueden ser superiores a las de cierre", "Aceptar");
    }

  }

  /**
   * Actualiza el valor de la cantidad de caracteres del campo descripcion del formulario.
   */
  sizeInputs() {
    this.description = this.formTemple.get('description').value.trim();
    if (!isNullOrUndefined(this.description)) {
      var aux = 2500 - this.description.length;
      if (this.countDescription > aux && aux >= 0) {
        this.countDescription = aux;
      } else if (this.countDescription < aux && aux <= 2500) {
        this.countDescription = aux;
      }
    }
  }

  /**
   * Resetea los valores del formulario, de las variables internas y de los valores del servicio.
   */
  resetDate() {
    this.formTemple = this.formBuilder.group({
      description: ['', Validators.required],
      hourOpeningMorning: ['', Validators.required],
      hourClosingMorning: ['', Validators.required],
      hourOpeningAfternoon: ['', Validators.required],
      hourClosingAfternoon: ['', Validators.required],
    });
    this.description = "";
    this.hourOpeningMorning = "";
    this.hourClosingMorning = "";
    this.hourOpeningAfternoon = "";
    this.hourClosingAfternoon = "";
    this.TempleService.resetTemple();
  }

  /**
   * Cancela todo los datos y redirige a home
   */
  cancel() {
    this.resetDate();
    this.TempleService.resetTemple();
    this.Router.navigate(['/home']);
  }

  /**
   * Muestra el spinner de carga
   */


  async presentAlertNoAction(messageHeader: string, message: string, textButton: string): Promise<void> {
    const alert = await this.alertController.create({
      header: messageHeader,
      message: message,
      buttons: [textButton]
    });
    await alert.present();
  }

  /**
   * Comprueba que las hora de apertura no sea igual o inferior a la de cierre por la mañana
   */
  checkHourMorning(): boolean {
    var aux: string;
    var opening: number;
    var closing: number;

    aux = this.hourOpeningMorning;
    opening = +(aux.replace(":", ""));

    aux = this.hourClosingMorning;
    closing = +(aux.replace(":", ""));

    return (opening < closing);
  }

  /**
   * Comprueba que las hora de apertura no sea igual o inferior a la de cierre por la tarde
   */
  checkHourAfternoon(): boolean {
    var aux: string;
    var opening: number;
    var closing: number;

    aux = this.hourOpeningAfternoon;
    opening = +(aux.replace(":", ""));

    aux = this.hourClosingAfternoon;
    closing = +(aux.replace(":", ""));

    return (opening < closing);
  }
}
