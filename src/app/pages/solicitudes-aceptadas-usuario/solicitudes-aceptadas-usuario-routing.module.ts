import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesAceptadasUsuarioPage } from './solicitudes-aceptadas-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesAceptadasUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesAceptadasUsuarioPageRoutingModule {}
