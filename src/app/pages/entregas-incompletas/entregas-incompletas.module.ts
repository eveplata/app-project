import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntregasIncompletasPageRoutingModule } from './entregas-incompletas-routing.module';

import { EntregasIncompletasPage } from './entregas-incompletas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntregasIncompletasPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [EntregasIncompletasPage]
})
export class EntregasIncompletasPageModule {}
