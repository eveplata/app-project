import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudProductosPageRoutingModule } from './crud-productos-routing.module';

import { CrudProductosPage } from './crud-productos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudProductosPageRoutingModule,
    ComponentsModule,
    
  ],
  declarations: [CrudProductosPage]
})
export class CrudProductosPageModule {}
