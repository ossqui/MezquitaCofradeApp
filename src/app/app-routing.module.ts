import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from "./guards/no-auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './components/login/login.module#LoginPageModule', canActivate: [NoAuthGuard] },
  { path: 'add-temple1', loadChildren: './components/addTemple/add-temple1/add-temple1.module#AddTemple1PageModule' },
  { path: 'add-temple2', loadChildren: './components/addTemple/add-temple2/add-temple2.module#AddTemple2PageModule' },
  { path: 'add-temple3', loadChildren: './components/addTemple/add-temple3/add-temple3.module#AddTemple3PageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
