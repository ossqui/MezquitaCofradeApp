import { Component, OnInit } from '@angular/core';
import { TempleService } from "../../../services/temple.service";

@Component({
  selector: 'app-add-temple1',
  templateUrl: './add-temple1.page.html',
  styleUrls: ['./add-temple1.page.scss'],
})
export class AddTemple1Page implements OnInit {
  private name:string;
  private type:string;
  private ageConstruction:string;
  private arquitectonicStyle:string;

  constructor(
    private TempleService: TempleService
  ) { }

  ngOnInit() {
  }

  savePart1(){
    this.TempleService.part1(this.name, this.type, this.ageConstruction,this.arquitectonicStyle);
  }

}
