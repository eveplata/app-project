import { Component, OnInit } from '@angular/core';
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
  isLoading: boolean = true;
  usuarios: Usuario[] = [];
  mUsuario!: Usuario;

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
    // Lógica para editar el usuario
  }
  
  eliminarUsuario(usuario: Usuario) {
    // Lógica para eliminar el usuario
  }
  
  verUsuario(usuario: Usuario) {
    // Lógica para eliminar el usuario
  }


  backToPage() {
    this.navCtrl.navigateBack('home');
  }


}
