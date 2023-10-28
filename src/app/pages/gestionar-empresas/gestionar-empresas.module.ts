import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionarEmpresasPageRoutingModule } from './gestionar-empresas-routing.module';

import { GestionarEmpresasPage } from './gestionar-empresas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionarEmpresasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [GestionarEmpresasPage]
})
export class GestionarEmpresasPageModule {}
