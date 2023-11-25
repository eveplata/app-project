import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesAceptadasPageRoutingModule } from './solicitudes-aceptadas-routing.module';

import { SolicitudesAceptadasPage } from './solicitudes-aceptadas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesAceptadasPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [SolicitudesAceptadasPage]
})
export class SolicitudesAceptadasPageModule {}
