import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, throwError } from 'rxjs'; 
import { mergeMap } from 'rxjs/operators';
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

  getProductosPorId(id_prod: string): Observable<any> {
    return this.firestore
      .collection('productos')
      .doc(id_prod)
      .valueChanges({ idField: 'id' });
  }

  getPorProducto(id_prod: string, estados: number[]): Observable<any> {
    return this.firestore
      .collection(
        'productos',
        (ref) => ref.where('id_prod', '==', id_prod).where('estado', 'in', estados)
      )
      .valueChanges({ idField: 'id' });
  }

  actualizarStock(id_prod: string, cantidadARestar: number): void {
    this.firestore
      .collection('productos')
      .doc(id_prod)
      .get()
      .subscribe((doc) => {
        const producto = doc.data() as Producto;
        if (producto) {
          producto.stock_act -= cantidadARestar;

          this.firestore.collection('productos').doc(id_prod).update(producto);
        }
      });

  }

  actualizarProducto(producto: Producto): Observable<any> {
    const productoId = producto.id; 
    return from(this.firestore.collection('productos').doc(productoId).update(producto));
  }

  crearProducto(producto: Producto): Observable<any> {
    return from(this.firestore.collection('productos').add(producto));
  }
  

  

  // eliminarProducto(idProducto: string): void {
  //   this.firestore
  //     .collection('productos')
  //     .doc(idProducto)
  //     .delete()
  //     .then(() => {
  //       console.log('Producto eliminado con éxito');
  //     })
  //     .catch((error) => {
  //       console.error('Error al eliminar el producto:', error);
  //     });
  // }
  

}
