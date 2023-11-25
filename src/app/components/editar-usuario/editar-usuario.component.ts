import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Empresa } from 'src/app/interfaces/empresas.interface';
import { Roles } from 'src/app/interfaces/roles.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioEmpresas } from 'src/app/interfaces/usuarioEmpresas.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent  implements OnInit {

  @Input() usuario!:Usuario;  
  @Input() isEditaUsuarioOpen!: boolean;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  roles: Roles[] = [];
    usuarioEmpresas: UsuarioEmpresas = {
    empresas: [],
    id_usr: ''
  };
  empresas: Empresa[] = [];
  isLoading: boolean = true;
  
  constructor(
    private rolesService: RolesService,
    private empresasService: EmpresasService,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {

    this.obtenerDatos();

    
  }

  obtenerDatos() {
    if(this.isEditaUsuarioOpen)
  {
    console.log('usuario', this.usuario)

    this.rolesService.obtenerRoles().subscribe((roles) => {
      this.roles = roles;
      console.log('roles', roles);
      this.empresasService.obtenerEmpresas().subscribe((empresas) => {
        this.empresas = empresas;
        this.usuarioService.getUsuarioEmpresas(this.usuario.id || '').subscribe((resp) => {
          this.usuarioEmpresas = resp[0];
          console.log('usuarioEmpresas', this.usuarioEmpresas);
        });
      });
    });

  }


  }

  
  getValorEstado(estado: number) {
    const nombresEstados = [
      { id: 0, valor: 'Inactivo' },
      { id: 1, valor: 'Activo' },
    ];
    const obEstado = nombresEstados.find((e) => e.id === estado);
    return obEstado !== undefined ? obEstado.valor : 'Valor no encontrado';
  }

  guardarCambios() {
    this.usuarioService.actualizarUsuario(this.usuario).subscribe((resp) => {
      console.log('Usuario editada:', resp);
      this.isEditaUsuarioOpen = false;
      this.closeModal.emit(this.isEditaUsuarioOpen);
    });
  }

  isCheckedRol(idRol: string) {
    const exist = this.usuario.roles.find(r => r.id_rol === idRol);
    //console.log('checked', idProducto+' - '+exist?.id);
    return exist != undefined ? true : false;    
  }



  backToPage() {
    this.isEditaUsuarioOpen = false;
    this.closeModal.emit(this.isEditaUsuarioOpen);
  }

}
