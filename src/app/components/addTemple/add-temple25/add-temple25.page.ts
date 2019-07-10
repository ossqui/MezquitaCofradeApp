import { ConectService } from './../../../services/conect.service';
import { AuthService } from './../../../services/auth.service';
import { ParseLocationService } from './../../../services/parse-location.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TempleService } from 'src/app/services/temple.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-temple25',
  templateUrl: './add-temple25.page.html',
  styleUrls: ['./add-temple25.page.scss'],
})
export class AddTemple25Page implements OnInit {

  public address: string = "";
  public number: string = "";
  public locality: string = "";
  public province: string = "";
  public postalCode: string = "";
  public via: string = "";

  public countAddress: number = 50;
  public countNumber: number = 6;
  public countLocality: number = 50;
  public countProvince: number = 50;
  public countPostalCode: number = 10;


  public formTemple: FormGroup;

  constructor(
    private TempleService: TempleService,
    private Router: Router,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private ParseLocationService: ParseLocationService,
    public AuthService: AuthService,
    public ConectService: ConectService
  ) {
    this.formTemple = this.formBuilder.group({
      via: [''],
      address: ['', Validators.required],
      number: ['', Validators.required],
      locality: ['', Validators.required],
      province: [''],
      postalCode: [''],
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
    this.via = this.formTemple.get('via').value.trim();
    this.address = this.formTemple.get('address').value.trim();
    this.number = this.formTemple.get('number').value.trim();
    this.locality = this.formTemple.get('locality').value.trim();
    this.province = this.formTemple.get('province').value.trim();
    this.postalCode = this.formTemple.get('postalCode').value.trim();

    if (this.address != null) {
      var aux = 50 - this.address.length;
      if (this.countAddress > aux && aux >= 0) {
        this.countAddress = aux;
      } else if (this.countAddress < aux && aux <= 50) {
        this.countAddress = aux;
      }
    }

    if (this.number != null) {
      var aux = 6 - this.number.length;
      if (this.countNumber > aux && aux >= 0) {
        this.countNumber = aux;
      } else if (this.countNumber < aux && aux <= 6) {
        this.countNumber = aux;
      }
    }

    if (this.locality != null) {
      var aux = 50 - this.locality.length;
      if (this.countLocality > aux && aux >= 0) {
        this.countLocality = aux;
      } else if (this.countLocality < aux && aux <= 50) {
        this.countLocality = aux;
      }
    }

    if (this.province != null) {
      var aux = 50 - this.province.length;
      if (this.countProvince > aux && aux >= 0) {
        this.countProvince = aux;
      } else if (this.countProvince < aux && aux <= 50) {
        this.countProvince = aux;
      }
    }

    if (this.postalCode != null) {
      var aux = 10 - this.postalCode.length;
      if (this.countPostalCode > aux && aux >= 0) {
        this.countPostalCode = aux;
      } else if (this.countPostalCode < aux && aux <= 10) {
        this.countPostalCode = aux;
      }
    }
  }

  savePart25() {
    this.via = this.formTemple.get('via').value.trim();
    this.address = this.formTemple.get('address').value.trim();
    this.number = this.formTemple.get('number').value.trim();
    this.locality = this.formTemple.get('locality').value.trim();
    this.province = this.formTemple.get('province').value.trim();
    this.postalCode = this.formTemple.get('postalCode').value.trim();

    let completeAddres = this.via + " " + this.address + " " + this.number;
    if (this.locality != "") completeAddres = completeAddres + ", " + this.locality;
    if (this.postalCode != "") completeAddres = completeAddres + " " + this.postalCode;
    if (this.province != "") completeAddres = completeAddres + ", " + this.province;

    this.ParseLocationService.parseCoordenadas(completeAddres)
      .then((result: NativeGeocoderResult[]) => {
        if (result[0].thoroughfare == this.via + " " + this.address) {
          this.TempleService.part3(result[0].latitude, result[0].longitude)
            .then(() => {
              this.Router.navigate(['/add-temple3']);
            })
            .catch(() => console.log("error al guardar"));
        } else {
          console.log("dirección no correcta");
        }
      })
      .catch(error => console.log(error));
  }

  cancel() {
    this.TempleService.resetTemple();
    this.Router.navigate(['/home']);
  }

}
