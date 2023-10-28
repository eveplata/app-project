import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionarHistorialPage } from './gestionar-historial.page';

const routes: Routes = [
  {
    path: '',
    component: GestionarHistorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionarHistorialPageRoutingModule {}
