import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private firestore: AngularFirestore

  ) { }
  obtenerRoles(): Observable<any[]> {
    return this.firestore
    .collection('roles')
    .valueChanges({ idField: 'id' });
  }

}
