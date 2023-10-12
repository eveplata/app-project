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
    this.firestore
      .collection('usuarios')
      .snapshotChanges()
      .subscribe((resp) => {
        resp.map((e) => {
          console.log('primera forma');
          console.log(e.payload.doc);
          console.log(e.payload.doc.id);
          console.log(e.payload.doc.get('nom_usr'));
          console.log(e.payload.doc.get('primer_ap'));
        });
      });

    this.firestore
      .collection('usuarios')
      .valueChanges({ idField: 'id' })
      .subscribe((resp) => {
        console.log('segunda forma');
        console.log(resp);
      });

    /* Ejemplo */
    //const id: string = '1';
    //this.firestore.collection('usuarios').add({ nombre: 'nom', ap: 'ss' }); //agregar
    //this.firestore.collection('usuarios').doc(id).delete(); //eliminar por id
    //this.firestore.collection('usuarios').doc(id).update({ nombre: 'nom', ap: 'ss' }); //actualizar por id
    //this.firestore.collection('usuarios').doc(id).valueChanges(); // recuperar por ide o toda la coleccion sin enviar el id
    /* Ejemplo */
  }
}
