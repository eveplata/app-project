import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesActivasPage } from './solicitudes-activas.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesActivasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesActivasPageRoutingModule {}
