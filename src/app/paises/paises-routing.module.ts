import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisesSelectorComponent } from './pages/paises-selector/paises-selector.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'selector', component:PaisesSelectorComponent},
      {path:'**', redirectTo:'selector'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }
