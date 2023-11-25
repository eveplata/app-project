import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController, NavController } from '@ionic/angular';
import { Empresa } from 'src/app/interfaces/empresas.interface';
import { Roles } from 'src/app/interfaces/roles.interface';
import { RolesUsr, Usuario } from 'src/app/interfaces/usuario.interface';
import { EmpresaUsrEp, UsuarioEmpresas } from 'src/app/interfaces/usuarioEmpresas.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {
  email: string = '';
  password: string = '';
  usuario: Usuario = {
    seg_ap: '',
    dir_usr: '',
    cel_usr: 0,
    primer_ap: '',
    fec_nac: null,
    fec_reg_ing: null,
    nom_usr: '',
    dep_usr: '',
    correo_usr: '',
    //id: '',
    estado: 1,
    roles: [],
  };
  uid!: string;
  roles: Roles[] = [];
  registroEnProceso = false;
  usuarioEmpresas: UsuarioEmpresas = {
    empresas: [],
    id_usr: ''
  };
  empresas: Empresa[] = [];
  isLoading: boolean = true;
  mostrarContrasena: boolean = false;
  iconoContrasena: string = 'eye';



  constructor(
    private navCtrl: NavController,
    private fireAuth: AngularFireAuth,
    private toastController: ToastController,
    private firestore: AngularFirestore,
    private rolesService: RolesService,
    private empresasService: EmpresasService
  ) {}

  ngOnInit() {
    this.rolesService.obtenerRoles().subscribe((roles) => {
      this.roles = roles;
      console.log('Roles:', this.roles);
    });

    this.obtenerEmpresas();
  }
  obtenerEmpresas() {
    this.empresasService.obtenerEmpresas().subscribe((resp) => {
      this.empresas = resp.filter((empresa) => empresa.estado === 1);

      this.empresas.sort((a, b) => {
        return a.nom_emp.localeCompare(b.nom_emp);
      });

      console.log('empresas', this.empresas);
      this.isLoading = false;

    });
  }

  registrar() {
    //console.log('rolesSeleccionados', this.rolesSeleccionados);
    console.log('rolesSeleccionados', this.usuario.roles);
    console.log('empresasSeleccionados', this.usuarioEmpresas.empresas);

    if (!this.email || !this.password) {
      this.mostrarError('Por favor, completa todos los campos.');
      return;
    }

    this.fireAuth.createUserWithEmailAndPassword(this.email, this.password)
    .then((result) => {
      if (result.user) {
        console.log('Usuario registrado, ID:', result.user.uid);

        this.uid = result.user.uid;
        this.usuario.correo_usr = this.email;
       //this.usuario.id = this.uid;

        this.firestore.collection('usuarios').doc(this.uid).set(this.usuario).then(res => {
          console.log('Registro de usuario exitoso!', res);
          this.usuarioEmpresas.id_usr = this.uid;
          this.firestore.collection('usuario_empresa').add(this.usuarioEmpresas).then(res => {
            console.log('Registro de usuario empresa exitoso!', res);
            
  
          })
          this.navCtrl.navigateForward('/gestionar-usuarios');


        });
  
        //console.log('Usuario registrado en la colección "usuarios"');
        //this.mostrarMensaje('Usuario registrado con éxito.');
        //this.navCtrl.navigateBack('/gestionar-usuarios');
        

      } else {
        this.mostrarMensaje('El registro no se completó con éxito.');
      }
    })
    .catch((error) => {
      console.error('Error al registrar usuario:', error);
      this.mostrarError('Ha ocurrido un error durante el registro. Por favor, inténtalo de nuevo.');
    });
  }

  
async mostrarMensaje(mensaje: string) {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 3000,
    position: 'top',
    color: 'success', 
  });
  toast.present();
}

  async mostrarError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }

toggleMostrarContrasena() {
  this.mostrarContrasena = !this.mostrarContrasena;
  this.iconoContrasena = this.mostrarContrasena ? 'eye-off' : 'eye';
}

  backToPage() {
    this.navCtrl.navigateBack('/gestionar-usuarios');
  }
}
