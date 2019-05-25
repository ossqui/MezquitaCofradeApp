import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';

import { IonicModule } from '@ionic/angular';

import { AddTemple3Page } from './add-temple3.page';

const routes: Routes = [
  {
    path: '',
    component: AddTemple3Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    Camera
  ],
  declarations: [AddTemple3Page]
})
export class AddTemple3PageModule {}
