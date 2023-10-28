import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionarSolicitudesPage } from './gestionar-solicitudes.page';

const routes: Routes = [
  {
    path: '',
    component: GestionarSolicitudesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionarSolicitudesPageRoutingModule {}
