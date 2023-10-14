import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Solicitud } from '../interfaces/solicitud.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  crearSolicitud(solicutd: Solicitud): Observable<any> {
    return from(this.firestore.collection('solicitudes').add(solicutd));
  }

}
