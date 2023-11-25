import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteProductosPageRoutingModule } from './reporte-productos-routing.module';

import { ReporteProductosPage } from './reporte-productos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteProductosPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ReporteProductosPage]
})
export class ReporteProductosPageModule {}
