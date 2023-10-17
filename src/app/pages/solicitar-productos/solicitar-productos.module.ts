import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitarProductosPageRoutingModule } from './solicitar-productos-routing.module';

import { SolicitarProductosPage } from './solicitar-productos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitarProductosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SolicitarProductosPage]
})
export class SolicitarProductosPageModule {}
