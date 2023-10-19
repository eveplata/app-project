import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialSolicitudPageRoutingModule } from './historial-solicitud-routing.module';

import { HistorialSolicitudPage } from './historial-solicitud.page';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialSolicitudPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [HistorialSolicitudPage]
})
export class HistorialSolicitudPageModule {}
