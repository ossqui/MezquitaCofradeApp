import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-carved2',
  templateUrl: './add-carved2.page.html',
  styleUrls: ['./add-carved2.page.scss'],
})
export class AddCarved2Page implements OnInit {
  private brotherhead:string = "";
  private processionDay: string = "";
  private description = "";
  private temple = "";

  private countBrotherhead: number;
  private countProcessionDay: number;
  private countDescription: number;
  
  constructor() { }

  ngOnInit() {
  }

}
