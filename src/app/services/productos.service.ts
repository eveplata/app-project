import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, throwError } from 'rxjs'; // Agrega throwError
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

  actualizarStock(idProducto: string, cantidadARestar: number): void {
    this.firestore
      .collection('productos')
      .doc(idProducto)
      .get()
      .subscribe((doc) => {
        const producto = doc.data() as Producto;
        if (producto) {
          // Resta la cantidadARestar del stock actual del producto
          producto.stock_act -= cantidadARestar;

          // Actualiza el producto en la base de datos
          this.firestore.collection('productos').doc(idProducto).update(producto);
        }
      });

  }

  // actualizarProducto(producto: Producto): Observable<any> {
  //   const productoId = producto.id;
  //   // Con el método set, sobrescribimos todo el documento del producto
  //   return from(this.firestore.collection('productos').doc(productoId).set(producto));
  // }


  actualizarProducto(producto: Producto): Observable<any> {
    const productoId = producto.id; // Reemplaza con la forma correcta de obtener el ID de la solicitud
    // Actualiza la solicitud en la base de datos
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
