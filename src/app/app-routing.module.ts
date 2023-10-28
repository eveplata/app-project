import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [LoginGuard],
    canLoad: [LoginGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    //pathMatch: 'full',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'solicitar-productos',
    loadChildren: () =>
      import('./pages/solicitar-productos/solicitar-productos.module').then(
        (m) => m.SolicitarProductosPageModule
      ),
    /* pathMatch: 'full',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard], */
  },
  {
    path: 'profile',
    loadChildren: () => 
    import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'historial-solicitud',
    loadChildren: () => 
    import('./pages/historial-solicitud/historial-solicitud.module')
    .then( m => m.HistorialSolicitudPageModule)
  },
  {
    path: 'solicitudes-pendientes',
    loadChildren: () => 
    import('./pages/solicitudes-pendientes/solicitudes-pendientes.module')
    .then( m => m.SolicitudesPendientesPageModule)
  },
  {
    path: 'solicitudes-activas',
    loadChildren: () =>
     import('./pages/solicitudes-activas/solicitudes-activas.module')
     .then( m => m.SolicitudesActivasPageModule)
  },
  {
    path: 'crud-productos',
    loadChildren: () => 
    import('./pages/crud-productos/crud-productos.module')
    .then( m => m.CrudProductosPageModule)
  },
  // {
  //   path: 'crear-productos',
  //   loadChildren: () => 
  //   import('./pages/crear-productos/crear-productos.module')
  //   .then( m => m.CrearProductosPageModule)
  // },
  {
    path: 'crear-productos',
    loadChildren: () => 
    import('./pages/crear-productos/crear-productos.module')
    .then( m => m.CrearProductosPageModule)
  },
  {
    path: 'crud-categorias',
    loadChildren: () => 
    import('./pages/crud-categorias/crud-categorias.module')
    .then( m => m.CrudCategoriasPageModule)
  },
  {
    path: 'crear-categorias',
    loadChildren: () => 
    import('./pages/crear-categorias/crear-categorias.module')
    .then( m => m.CrearCategoriasPageModule)
  },
  {
    path: 'gestionar-solicitudes',
    loadChildren: () => 
    import('./pages/gestionar-solicitudes/gestionar-solicitudes.module')
    .then( m => m.GestionarSolicitudesPageModule)
  },
  {
    path: 'gestionar-historial',
    loadChildren: () => 
    import('./pages/gestionar-historial/gestionar-historial.module').
    then( m => m.GestionarHistorialPageModule)
  },
  {
    path: 'entregas-incompletas',
    loadChildren: () => 
    import('./pages/entregas-incompletas/entregas-incompletas.module')
    .then( m => m.EntregasIncompletasPageModule)
  },
  {
    path: 'gestionar-empresas',
    loadChildren: () => 
    import('./pages/gestionar-empresas/gestionar-empresas.module')
    .then( m => m.GestionarEmpresasPageModule)
  },
  {
    path: 'gestionar-usuarios',
    loadChildren: () => 
    import('./pages/gestionar-usuarios/gestionar-usuarios.module')
    .then( m => m.GestionarUsuariosPageModule)
  },
  {
    path: 'crear-empresa',
    loadChildren: () =>
    import('./pages/crear-empresa/crear-empresa.module')
    .then( m => m.CrearEmpresaPageModule)
  },  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
