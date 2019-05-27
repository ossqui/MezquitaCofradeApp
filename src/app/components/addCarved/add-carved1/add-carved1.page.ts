import { CarvedService } from './../../../services/carved.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  private countName: number;
  private countAuthor: number;
  private countAgeOfCarved: number;
  private countStyle: number;
  private countMaterial: number;

  public formCarved: FormGroup;

  constructor(
    private Router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private CarvedService: CarvedService
  ) {
    this.formCarved = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      ageOfCarved: ['', Validators.required],
      style: ['', Validators.required],
      material: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  sizeInputs() {
    this.name = this.formCarved.get('name').value.trim();
    this.author = this.formCarved.get('author').value.trim();
    this.ageOfCarved = this.formCarved.get('ageOfCarved').value.trim();
    this.style = this.formCarved.get('style').value.trim();
    this.material = this.formCarved.get('material').value.trim();
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

        this.presentAlert("Importante", "No se puede rellenar campos unicamente con espacios", "Aceptar");

      })
  }

  resetDate(){
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
  cancel(){
    this.resetDate();
    this.Router.navigate(['/home']);
  }
}
