import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'main',
    loadChildren: './main/main.module#MainModule',
    canActivate: [AuthGuard],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
