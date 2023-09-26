import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user!: any;

  constructor(
    private fireAuth: AngularFireAuth,
  ) {
    this.user = this.getUserAuth();
  }

  getUserAuth() {
    //return this.fireAuth.authState;
    return this.user = this.fireAuth.authState.pipe(
      switchMap((user) => {
        //this.user = user != null ? true : false;
        return of(user);
      })
    );
  }

  exitUser(): Observable<boolean> {
    return of(this.user != null ? true : false);
  }

  loginWithEmailAndPassword(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.fireAuth.signOut();
  }
}
