import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReclamoUsuarioPage } from './reclamo-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: ReclamoUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReclamoUsuarioPageRoutingModule {}
