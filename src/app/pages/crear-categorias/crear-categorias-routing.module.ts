import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearCategoriasPage } from './crear-categorias.page';

const routes: Routes = [
  {
    path: '',
    component: CrearCategoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearCategoriasPageRoutingModule {}
