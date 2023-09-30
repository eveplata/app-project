import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitarProductosPage } from './solicitar-productos.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitarProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitarProductosPageRoutingModule {}
