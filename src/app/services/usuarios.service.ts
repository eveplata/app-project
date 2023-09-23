import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  async prueba() {
    //await this.storage.set('prueba', 'valor para storage');
    //await this.storage.set('prueba2', { msg: 'valor storage json' });
    this.firestore.collection('usuarios').snapshotChanges().subscribe((resp) => {
      resp.map((e) => {
        console.log(e.payload.doc.id);
        console.log(e.payload.doc.get('nombre'));
        console.log(e.payload.doc.get('apellido'));
      })
      
    });
  }
}
