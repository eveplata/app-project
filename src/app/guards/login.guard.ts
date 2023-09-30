import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../services/login.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate, CanLoad {
  constructor(
    private loginService: LoginService,
    private navCtrl: NavController
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginService.exitAuth().pipe(
      tap((valid) => {
        console.log('canActivate login', valid);
        if (!valid) this.navCtrl.navigateRoot('home');
      })
    );
  }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginService.exitAuth().pipe(
      tap((valid) => {
        console.log('canLoad login', valid);
        if (!valid) this.navCtrl.navigateRoot('home');
      })
    );
  }
}
