import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntregasIncompletasPage } from './entregas-incompletas.page';

const routes: Routes = [
  {
    path: '',
    component: EntregasIncompletasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntregasIncompletasPageRoutingModule {}
