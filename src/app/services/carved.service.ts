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
  private image: string;
  private brotherhood: string;

  constructor() { }

  part1(name: string, author: string, ageOfCarved: string, style: string, material:string) {
    var count = 0;
    if (name.length <= 60 && name.length > 0 && !isNullOrUndefined(name)) { this.name = name; count = count + 1; };
    if (author.length <= 40 && author.length > 0 && !isNullOrUndefined(author)) { this.author = author; count = count + 1; };
    if (ageOfCarved.length <= 20 && ageOfCarved.length > 0 && !isNullOrUndefined(ageOfCarved)) { this.ageOfCarved = ageOfCarved; count = count + 1; };
    if (style.length <= 50 && style.length > 0 && !isNullOrUndefined(style)) { this.style = style; count = count + 1; };
    if (material.length <= 40 && material.length > 0 && !isNullOrUndefined(material)) { this.material = material; count = count + 1; };
    console.log(count);
    
    return new Promise ((resolve, rejected) =>{
      if(count == 5){
        return resolve(true);
      }else{
        return rejected(false);
      }
    })
    
  }
}
