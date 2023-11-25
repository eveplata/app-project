import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { ProductoSlt, Solicitud } from '../interfaces/solicitud.interface';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  constructor(private firestore: AngularFirestore) {}

  crearSolicitud(solicutd: Solicitud): Observable<any> {
    return from(this.firestore.collection('solicitudes').add(solicutd));
  }

  getSolicitudes(): Observable<any> {
    return this.firestore
      .collection('solicitudes')
      .valueChanges({ idField: 'id' });
  }
  

  /*
  Esta función recupera el historial de solicitudes por el id_usr del usuario y el estado
  El estado se debe definir como vas a manejarlo por ejemplo 1 = solitud activa, 2 = aceptada, 3 = entregado, -1 = rechazado
  ese es un ejemplo eso lo puedes cambiar y agregar mas estados
  y esta función te servira para recuperar por id_usr y el estado de la solicitud
  */
  getSolicitudesPorUsuario(id_usr: string, estados: number[]): Observable<any> {
    return this.firestore
      .collection(
        'solicitudes',
        (ref) => ref.where('id_usr', '==', id_usr).where('estado', 'in', estados)
      )
      .valueChanges({ idField: 'id' });
  }

  getSolicitudesPorEstado(estados: number[]): Observable<any> {
    return this.firestore
      .collection(
        'solicitudes',
        (ref) => ref.where('estado', 'in', estados)
      )
      .valueChanges({ idField: 'id' });
  }

  getProductosPorId(id_prod: string): Observable<any> {
    return this.firestore
      .collection('solicitudes')
      .doc(id_prod)
      .valueChanges({ idField: 'id' });
  }

  getSolicitudesConProducto(idProducto: string): Observable<Solicitud[]> {
    return this.firestore
      .collection<Solicitud>('solicitudes', (ref) =>
        ref.where('productos', 'array-contains', { id_producto: idProducto }))
      .valueChanges();
  }
  

  actualizarSolicitud(solicitud: Solicitud): Observable<any> {
    const solicitudId = solicitud.id; // Reemplaza con la forma correcta de obtener el ID de la solicitud
    // Actualiza la solicitud en la base de datos
    return from(this.firestore.collection('solicitudes').doc(solicitudId).update(solicitud));
  }
  
  // actualizarStock(idSolicitud: string, producto: ProductoSlt): void {
  //   this.firestore
  //     .collection('solicitudes')
  //     .doc(idSolicitud)
  //     .get()
  //     .subscribe((doc) => {
  //       const solicitud = doc.data() as Solicitud;
  //       if (solicitud) {
  //         const productosActualizados = solicitud.productos.map((p: ProductoSlt) => {
  //           if (p.id_producto === producto.id_producto) {
  //             p.stock_act = producto.stock_act || 0;
  //           }
  //           return p;
  //         });
  //         solicitud.productos = productosActualizados;
  
  //         this.firestore.collection('solicitudes').doc(idSolicitud).update(solicitud);
  //       }
  //     });
  // }
  
}
