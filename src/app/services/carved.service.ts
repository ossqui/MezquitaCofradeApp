import { Carved } from './../model/carved';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class CarvedService {
  private carved: Carved = {}
  private name: string;
  private author: string;
  private ageOfCarved: string;
  private style: string;
  private note: string;
  private material: string;
  private description: string;
  private brotherhood: string;
  private processionDay: string;
  private temple: string;

  constructor() { }

  part1(name: string, author: string, ageOfCarved: string, style: string, material: string) {
    var count = 0;
    if (name.length <= 60 && name.length > 0 && !isNullOrUndefined(name)) { this.name = name; count = count + 1; };
    if (author.length <= 40 && author.length > 0 && !isNullOrUndefined(author)) { this.author = author; count = count + 1; };
    if (ageOfCarved.length <= 20 && ageOfCarved.length > 0 && !isNullOrUndefined(ageOfCarved)) { this.ageOfCarved = ageOfCarved; count = count + 1; };
    if (style.length <= 50 && style.length > 0 && !isNullOrUndefined(style)) { this.style = style; count = count + 1; };
    if (material.length <= 40 && material.length > 0 && !isNullOrUndefined(material)) { this.material = material; count = count + 1; };

    return new Promise((resolve, rejected) => {
      if (count == 5) {
        return resolve(true);
      } else {
        this.resetPart2();
        return rejected(false);
      }
    })

  }

  part2(brotherhood: string, processionDay: string, description: string, temple: string) {
    var count = 0;

    if (brotherhood.length <= 100 && brotherhood.length > 0 && !isNullOrUndefined(brotherhood)) { this.brotherhood = brotherhood; count = count + 1; };
    if (processionDay.length <= 40 && processionDay.length > 0 && !isNullOrUndefined(processionDay)) { this.processionDay = processionDay; count = count + 1; };
    if (description.length <=2500 && description.length > 0 && !isNullOrUndefined(description)) { this.description = description; count = count + 1; };
    if (temple.length <= 40 && temple.length > 0 && !isNullOrUndefined(temple)) { this.temple = temple; count = count + 1; };

    return new Promise((resolve, rejected) => {
      if (count == 4) {
        return resolve(true);
      } else {
        this.resetPart2()
        return rejected(false);
      }
    });
  }

  returnCarved(image: string) {
    if (!isNullOrUndefined(image)) {
      this.carved = {
        name: this.name,
        author: this.author,
        ageOfCarved: this.ageOfCarved,
        style: this.style,
        material: this.material,
        description: this.description,
        image: image,
        brotherhood: this.brotherhood,
        processionDay: this.processionDay,
        temple: this.temple,
      }
    }
    
    return Promise.resolve(this.carved);
  }

  resetCarved(){
    this.carved = {};
    this.resetPart1();
    this.resetPart2();
  }

  resetPart1(){
    this.name = "";
    this.author = "";
    this.ageOfCarved = "";
    this.style = "";
    this.material = "";
  }
  resetPart2(){
    this.description = "";
    this.temple = "";
    this.material = "";
    this.processionDay = "";
  }
}
