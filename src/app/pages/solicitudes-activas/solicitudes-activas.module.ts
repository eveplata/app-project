import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesActivasPageRoutingModule } from './solicitudes-activas-routing.module';

import { SolicitudesActivasPage } from './solicitudes-activas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesActivasPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [SolicitudesActivasPage]
})
export class SolicitudesActivasPageModule {}
