import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionarSolicitudesPageRoutingModule } from './gestionar-solicitudes-routing.module';

import { GestionarSolicitudesPage } from './gestionar-solicitudes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionarSolicitudesPageRoutingModule
  ],
  declarations: [GestionarSolicitudesPage]
})
export class GestionarSolicitudesPageModule {}
