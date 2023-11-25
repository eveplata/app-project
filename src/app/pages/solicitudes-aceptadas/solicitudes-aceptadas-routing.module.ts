import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesAceptadasPage } from './solicitudes-aceptadas.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesAceptadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesAceptadasPageRoutingModule {}
