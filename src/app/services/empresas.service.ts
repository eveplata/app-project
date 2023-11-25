import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Empresa } from '../interfaces/empresas.interface';
import { EmpresaUsuarioService } from './empresa-usuario.service';
import { UsuarioEmpresas } from '../interfaces/usuarioEmpresas.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  obtenerEmpresas(): Observable<any[]>{
    return this.firestore
    .collection('empresas')
    .valueChanges({idField: 'id'});
  }

  actualizarEmpresa(empresa: Empresa): Observable<any> {
    const empresaId = empresa.id; 
    return from(this.firestore
      .collection('empresas')
      .doc(empresaId)
      .update(empresa));
  }
  crearEmpresa(empresa: Empresa): Observable<any> {
    return from(this.firestore
      .collection('empresas')
      .add(empresa));
 }


crearEmpUsr(empresaUsr: EmpresaUsuarioService): Observable<any> {
  return from(this.firestore
    .collection('usuario_empresa')
    .add(empresaUsr));
}

  actualizarUsuarioEmpresa(usuarioEmpresa: UsuarioEmpresas): Observable<any> {
    const usuarioEmpresaId = usuarioEmpresa.id; 
    return from(this.firestore.collection('usuario_empresa').doc(usuarioEmpresaId).update(usuarioEmpresa));
  }



}
  
