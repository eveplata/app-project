import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialSolicitudPage } from './historial-solicitud.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialSolicitudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialSolicitudPageRoutingModule {}
