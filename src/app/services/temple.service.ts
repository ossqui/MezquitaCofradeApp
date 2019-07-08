import { Temple } from './../model/temple';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class TempleService {

  private templeGenerate: Temple = {};
  private name: string;
  private type: string;
  private ageConstruction: string;
  private arquitectonicStyle: string;
  private description: string;
  private hourOpeningMorning: string;
  private hourCloseMorning: string;
  private hourOpeningAfternoon: string;
  private hourCloseAfternoon: string;

  constructor() { }

  part1(name: string, type: string, ageConstruction: string, arquitectonicStyle: string) {
    var count = 0;
    if (name.length <= 60 && name.length > 0 && !isNullOrUndefined(name)) { this.name = name; count = count + 1; }
    if (type.length <= 50 && type.length > 0 && !isNullOrUndefined(type)) { this.type = type; count = count + 1; }
    if (ageConstruction.length <= 20 && ageConstruction.length > 0 && !isNullOrUndefined(ageConstruction)) { this.ageConstruction = ageConstruction; count = count + 1; }
    if (arquitectonicStyle.length <= 50 && arquitectonicStyle.length > 0 && !isNullOrUndefined(arquitectonicStyle)) { this.arquitectonicStyle = arquitectonicStyle; count = count + 1; }
    if (count == 4) {
      return true;
    } else {
      this.resetPart1();
      return false;
    }
  }

  part2(description: string, hom: string, hcm: string, hoa: string, hca: string) {
    var count = 0;
    if (description.length <= 2500 && description.length > 0 && !isNullOrUndefined(description)) { this.description = description; count = count + 1; }
    if( hom.length <= 15 && hom.length > 0 && !isNullOrUndefined(hom)){this.hourOpeningMorning = hom;count = count + 1}
    if( hcm.length <= 15 && hcm.length > 0 && !isNullOrUndefined(hcm)){this.hourCloseMorning = hcm;count = count + 1}
    if( hoa.length <= 15 && hoa.length > 0 && !isNullOrUndefined(hoa)){this.hourOpeningAfternoon = hoa;count = count + 1}
    if( hca.length <= 15 && hca.length > 0 && !isNullOrUndefined(hca)){this.hourCloseAfternoon = hca;count = count + 1}
    if(count == 5){
      return Promise.resolve(true);
    }else{
      this.resetPart2();
      return Promise.reject(false);
    }
  }

  returnTemple(image:string){
    if(!isNullOrUndefined(image)){
       this.templeGenerate = {
        name: this.name,
        type: this.type,
        ageConstruction: this.ageConstruction,
        arquitectonicStyle: this.arquitectonicStyle,
        description: this.description,
        hourOpeningMorning: this.hourOpeningMorning,
        hourClosingMorning: this.hourCloseMorning,
        hourOpeningAfternoon: this.hourOpeningAfternoon,
        hourClosingAfternoon: this.hourCloseAfternoon,
        image: image
      }

      return Promise.resolve(this.templeGenerate);
    }
  }


  resetTemple(){
    this.templeGenerate = {};
    this.resetPart1();
    this.resetPart2();
  }

  resetPart1(){
    this.name = "";
    this.type = "";
    this.ageConstruction = "";
    this.arquitectonicStyle = "";
  }
  resetPart2(){
    this.description = "";
    this.hourOpeningMorning = "";
    this.hourCloseMorning = "";
    this.hourOpeningAfternoon = "";
    this.hourCloseAfternoon = "";
  }
}
