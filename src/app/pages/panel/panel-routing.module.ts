import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: '', redirectTo: 'inicio', pathMatch: 'full'
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module')
          .then(u => u.UsuariosModule)
      },
      {
        path: 'beneficiarios',
        loadChildren: () => import('./beneficiarios/beneficiarios.module')
          .then(u => u.BeneficiariosModule)
      },
      {
        path: 'areas',
        loadChildren: () => import('./areas/areas.module')
          .then(a => a.AreasModule)
      },
      {
        path: 'mapa',
        loadChildren: () => import('./mapa-programas-sociales/mapa-programas-sociales.module')
          .then(map => map.MapaProgramasSocialesModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
