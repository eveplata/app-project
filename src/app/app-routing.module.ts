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


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
