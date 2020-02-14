import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ShowComponent } from './show/show.component';


const routes: Routes = [
  {path:'', redirectTo:'add', pathMatch:'full'},
  {path: 'add', component: AddComponent} ,
  {path: 'add/:id', component: AddComponent} ,
  { path: 'show', component: ShowComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
