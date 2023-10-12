import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Producto } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  obtenerProductos(): Observable<any> {
    return this.firestore
      .collection('productos')
      .valueChanges({ idField: 'id' });
  }

}
