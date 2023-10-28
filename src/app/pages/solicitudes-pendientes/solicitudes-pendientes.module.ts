import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesPendientesPageRoutingModule } from './solicitudes-pendientes-routing.module';

import { SolicitudesPendientesPage } from './solicitudes-pendientes.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesPendientesPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [SolicitudesPendientesPage]
})
export class SolicitudesPendientesPageModule {}
