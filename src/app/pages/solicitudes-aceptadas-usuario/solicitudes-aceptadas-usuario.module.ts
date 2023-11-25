import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesAceptadasUsuarioPageRoutingModule } from './solicitudes-aceptadas-usuario-routing.module';

import { SolicitudesAceptadasUsuarioPage } from './solicitudes-aceptadas-usuario.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesAceptadasUsuarioPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [SolicitudesAceptadasUsuarioPage]
})
export class SolicitudesAceptadasUsuarioPageModule {}
