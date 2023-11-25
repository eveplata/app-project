import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MenuComponent } from './menu/menu.component';
import { LoaderComponent } from './loader/loader.component';
import { SeleccionarProductosComponent } from './seleccionar-productos/seleccionar-productos.component';
import { DetalleHistorialComponent } from './detalle-historial/detalle-historial.component';
import { RevisarSolicitudComponent } from './revisar-solicitud/revisar-solicitud.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { VerCategoriaComponent } from './ver-categoria/ver-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { EspecificarSolicitudesComponent } from './especificar-solicitudes/especificar-solicitudes.component';
import { CompletarSolicitudesComponent } from './completar-solicitudes/completar-solicitudes.component';
import { ReporteHistorialComponent } from './reporte-historial/reporte-historial.component';
import { VerEmpresaComponent } from './ver-empresa/ver-empresa.component';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { VerUsuarioComponent } from './ver-usuario/ver-usuario.component';
import { UsuarioAceptadasComponent } from './usuario-aceptadas/usuario-aceptadas.component';
import { SolicitudesAceptadasAdminComponent } from './solicitudes-aceptadas-admin/solicitudes-aceptadas-admin.component';

@NgModule({
  declarations: [
    MenuComponent,
    LoaderComponent,
    SeleccionarProductosComponent,
    DetalleHistorialComponent,
    RevisarSolicitudComponent,
    VerProductoComponent,
    EditarProductoComponent,
    VerCategoriaComponent,
    EditarCategoriaComponent,
    EspecificarSolicitudesComponent,
    CompletarSolicitudesComponent,
    ReporteHistorialComponent,
    VerEmpresaComponent,
    EditarEmpresaComponent,
    EditarUsuarioComponent,
    VerUsuarioComponent,
    UsuarioAceptadasComponent,
    SolicitudesAceptadasAdminComponent,

  ],
  exports: [
    MenuComponent,
    LoaderComponent,
    SeleccionarProductosComponent,
    DetalleHistorialComponent,
    RevisarSolicitudComponent,
    VerProductoComponent,
    EditarProductoComponent,
    VerCategoriaComponent,
    EditarCategoriaComponent,
    EspecificarSolicitudesComponent,
    CompletarSolicitudesComponent,
    ReporteHistorialComponent,
    VerEmpresaComponent,
    EditarEmpresaComponent,
    EditarUsuarioComponent,
    VerUsuarioComponent,
    UsuarioAceptadasComponent,
    SolicitudesAceptadasAdminComponent,

    

  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
})
export class ComponentsModule {}
