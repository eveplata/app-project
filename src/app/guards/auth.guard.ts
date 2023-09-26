import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../services/login.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private loginService: LoginService,
    private navCtrl: NavController
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginService.exitUser().pipe( 
      tap((valid) => {
        console.log('canActivate auth', valid);
        if (!valid) this.navCtrl.navigateRoot('login');
      })
    );
  }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginService.exitUser().pipe(
      tap((valid) => {
        console.log('canLoad auth', valid);
        if (!valid) this.navCtrl.navigateRoot('login');
      })
    );
  }
}
