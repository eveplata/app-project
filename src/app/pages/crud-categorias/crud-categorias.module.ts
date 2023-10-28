import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudCategoriasPageRoutingModule } from './crud-categorias-routing.module';

import { CrudCategoriasPage } from './crud-categorias.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudCategoriasPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [CrudCategoriasPage]
})
export class CrudCategoriasPageModule {}
