import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(
    private fireStorage: AngularFireStorage,
  ) { }

  // subirArchivo(file: any, nomArchivo: string, path: string){

  //   const filePath = path + '/' + nomArchivo;
    /*const ref = this.fireStorage.ref(filePath);
    const task = ref.put(file);

    task.then(respFile => {
      console.log(respFile);
      ref.getDownloadURL().subscribe((URL) => {
        console.log(URL);
      });
      
    })*/

  // }
}
