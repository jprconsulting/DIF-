import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramassocialesComponent } from './programassociales.component';
const routes: Routes = [
  {
    path: '',
    component: ProgramassocialesComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramassocialesRoutingModule { }
