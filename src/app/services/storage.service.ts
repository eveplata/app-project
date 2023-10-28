import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Observable, from, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  async get(key: string) {
    const data = await this.storage.get(key);
    return data;
  }

  async removeByKey(key: string) {
    await this.storage.remove(key);
  }

  async clearAll() {
    await this.storage.clear();
  }

  getStorageData(key: string): Observable<any> {
    return from(this.storage.get(key)).pipe(
      map((data: any) => {
        //console.log(data);        
        return data;
      })
    );
    //return of(data);
  }

  uploadImage (){
    return new Promise (resolve=>{

      setTimeout(()=>{
        resolve(true);

        console.log('responde la promesa ');
        return;

      }, 2000)

  });
}
}
