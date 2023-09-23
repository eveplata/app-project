import { Component, OnInit } from '@angular/core';

import { StorageService } from 'src/app/services/storage.service';

import { inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private storage: StorageService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {}

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

  async borrarStorage() {
    //await this.storage.removeByKey('prueba');
    await this.storage.clearAll();
  }
}
