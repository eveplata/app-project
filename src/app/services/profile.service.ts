import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getDatos(): Observable<any> {
    return this.firestore
      .collection('usuarios')
      .valueChanges({ uid: 'id' });
  }

}
