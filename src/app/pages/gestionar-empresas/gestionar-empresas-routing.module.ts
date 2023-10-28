import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionarEmpresasPage } from './gestionar-empresas.page';

const routes: Routes = [
  {
    path: '',
    component: GestionarEmpresasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionarEmpresasPageRoutingModule {}
