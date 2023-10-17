import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MenuComponent } from './menu/menu.component';
import { LoaderComponent } from './loader/loader.component';
import { SeleccionarProductosComponent } from './seleccionar-productos/seleccionar-productos.component';

@NgModule({
  declarations: [
    MenuComponent,
    LoaderComponent,
    SeleccionarProductosComponent
  ],
  exports: [
    MenuComponent,
    LoaderComponent,
    SeleccionarProductosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
})
export class ComponentsModule {}
