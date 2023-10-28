import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearCategoriasPageRoutingModule } from './crear-categorias-routing.module';

import { CrearCategoriasPage } from './crear-categorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearCategoriasPageRoutingModule
  ],
  declarations: [CrearCategoriasPage]
})
export class CrearCategoriasPageModule {}
