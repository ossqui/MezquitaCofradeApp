import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from "./guards/no-auth.guard";
import { ContentEditorGuard } from "./guards/content-editor.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './components/login/login.module#LoginPageModule', canActivate: [NoAuthGuard] },
  { path: 'add-temple1', loadChildren: './components/addTemple/add-temple1/add-temple1.module#AddTemple1PageModule', canActivate: [AuthGuard, ContentEditorGuard] },
  { path: 'add-temple2', loadChildren: './components/addTemple/add-temple2/add-temple2.module#AddTemple2PageModule', canActivate: [AuthGuard, ContentEditorGuard] },
  { path: 'sign-up', loadChildren: './components/sign-up/sign-up.module#SignUpPageModule', canActivate: [NoAuthGuard] },
  { path: 'add-temple3', loadChildren: './components/addTemple/add-temple3/add-temple3.module#AddTemple3PageModule', canActivate: [AuthGuard, ContentEditorGuard] },
  { path: 'add-carved1', loadChildren: './components/addCarved/add-carved1/add-carved1.module#AddCarved1PageModule', canActivate: [AuthGuard, ContentEditorGuard] },
  { path: 'add-carved2', loadChildren: './components/addCarved/add-carved2/add-carved2.module#AddCarved2PageModule', canActivate: [AuthGuard, ContentEditorGuard] },
  { path: 'add-carved3', loadChildren: './components/addCarved/add-carved3/add-carved3.module#AddCarved3PageModule', canActivate: [AuthGuard, ContentEditorGuard] },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
