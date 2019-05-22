import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Temple } from 'src/app/model/temple';

@Component({
  selector: 'app-temple',
  templateUrl: './temple.component.html',
  styleUrls: ['./temple.component.scss'],
})
export class TempleComponent implements OnInit {
  temple: Temple;

  constructor(
    private ModalController: ModalController,
    private NavParams: NavParams
  ) { }

  ngOnInit() {
    this.temple = this.NavParams.get('temple');
  }

  closeModal(){
    this.ModalController.dismiss();
  }
}
