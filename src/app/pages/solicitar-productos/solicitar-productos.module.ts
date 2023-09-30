import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitarProductosPageRoutingModule } from './solicitar-productos-routing.module';

import { SolicitarProductosPage } from './solicitar-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitarProductosPageRoutingModule
  ],
  declarations: [SolicitarProductosPage]
})
export class SolicitarProductosPageModule {}
