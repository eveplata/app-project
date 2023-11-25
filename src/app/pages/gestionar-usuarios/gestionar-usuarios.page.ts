import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.page.html',
  styleUrls: ['./gestionar-usuarios.page.scss'],
})
export class GestionarUsuariosPage implements OnInit {

  id_usr!: string;
  isModalOpen: boolean = false;
  isVerUsuarioOpen: boolean = false;
  isEditaUsuarioOpen: boolean = false;
  isLoading: boolean = true;
  usuarios: Usuario[] = [];
  mUsuario!: Usuario;
  isEditarUsuario: boolean = false;

  constructor(
    private navCtrl: NavController,
    private usuariosServices: UsuariosService,

  ) { }

  ngOnInit() {

    this.listarUsuarios();

  }

  listarUsuarios(){

    this.usuariosServices.getUsuario().subscribe((resp) =>{
      this.usuarios = resp;
      this.usuarios.sort((a, b) => {
        if (a.estado === 1 && b.estado === 0) {
          return -1;
        } else if (a.estado === 0 && b.estado === 1) {
          return 1; 
        } else {
          return a.nom_usr.localeCompare(b.nom_usr); 
        }
      });
  
      console.log('usuarios', this.usuarios);
      this.isLoading = false;
    })

  }

  getValorEstado(estado: number) {
    const nombresEstados = [
      { id: 0, valor: 'Inactivo' },
      { id: 1, valor: 'Activo' },
    ];
    const obEstado = nombresEstados.find( e => e.id === estado);
    return obEstado != undefined ? obEstado.valor : 'Valor no encontrado'
  }

  editarUsuario(usuario: Usuario) {
    // this.isEditaUsuarioOpen = true;
    // this.mUsuario = usuario;
    // this.isEditarUsuario = true;
    let navigationExtras: NavigationExtras = {
      queryParams: {
          usuario: JSON.stringify(usuario)
      }
    };
  //this.navCtrl.navigateForward(['page-slug'], true, navigationExtras);
    this.navCtrl.navigateForward(['editar-usuario'], navigationExtras);


  }
  
  eliminarUsuario(usuario: Usuario) {
    usuario.estado = 0;
    this.usuariosServices.actualizarUsuario(usuario).subscribe((resp) => {
      console.log('Usuario cambiado a estado inactivo:', resp);
      this.listarUsuarios();
    });

  }
  
  verUsuario(usuario: Usuario) {
  }


  backToPage() {
    this.navCtrl.navigateBack('home');
  }
  openModal(usuario:Usuario) {
    // this.isVerUsuarioOpen = true;
    this.isEditaUsuarioOpen = true;
    this.isEditarUsuario = true;

    // this.mUsuario = usuario;
  }

  closeModal(event: any) {
    console.log(event);
    this.isEditaUsuarioOpen = event;
    this.isEditarUsuario = false;
  }


}
