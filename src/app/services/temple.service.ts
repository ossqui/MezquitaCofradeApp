import { Temple } from './../model/temple';
import { Injectable } from '@angular/core';
import { templateSourceUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TempleService {

  templeGenerate: Temple;

  constructor() { }

  part1(name: string, type: string, ageConstruction: string, arquitectonicStyle: string) {
    this.templeGenerate.name = name;
    this.templeGenerate.type = type;
    this.templeGenerate.ageConstruction = ageConstruction;
    this.templeGenerate.arquitectonicStyle = arquitectonicStyle;
  }

  part2(description: string) {
    this.templeGenerate.description = description;
  }

  part3(constructionDescription: string){
    this.templeGenerate.constructionDescription = constructionDescription;
  }

  /**
   * no implementado
   */
  saveTemple(){

  }
}
