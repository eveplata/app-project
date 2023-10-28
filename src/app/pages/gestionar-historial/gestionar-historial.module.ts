import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionarHistorialPageRoutingModule } from './gestionar-historial-routing.module';

import { GestionarHistorialPage } from './gestionar-historial.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionarHistorialPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [GestionarHistorialPage]
})
export class GestionarHistorialPageModule {}
