import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map } from 'rxjs';
import { Categoria } from '../interfaces/categorias.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  obtenerCategorias(): Observable<any[]> {
    return this.firestore
    .collection('categorias')
    .valueChanges({ idField: 'id' });
  }

  actualizarCategoria(categoria: Categoria): Observable<any> {
    const categoriaId = categoria.id; 
    return from(this.firestore.collection('categorias').doc(categoriaId).update(categoria));
  }
  crearCategoria(categoria: Categoria): Observable<any> {
     return from(this.firestore.collection('categorias').add(categoria));
  }
} 
