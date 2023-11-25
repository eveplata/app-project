import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Reclamos } from '../interfaces/reclamos.interface';

@Injectable({
  providedIn: 'root'
})
export class ReclamosService {

  constructor(
    private firestore: AngularFirestore,

  ) { }

  getObetenerReclamos(): Observable<any>{
    return this.firestore
    .collection('reclamos')
    .valueChanges({idField: 'id' })
    
  } 

  getReclamosPorUsuario(id_usr: string): Observable<any> {
    return this.firestore
      .collection(
        'reclamos',
        (ref) => ref.where('id_usr', '==', id_usr)
      )
      .valueChanges({ idField: 'id' });
  }

  crearReclamo(reclamo: Reclamos): Observable<any> {
    return from(this.firestore.collection('reclamos').add(reclamo));
  }

}
