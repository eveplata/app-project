import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController, NavController } from '@ionic/angular';
import { Empresa } from 'src/app/interfaces/empresas.interface';
import { Roles, Usuario } from 'src/app/interfaces/usuario.interface';
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
    id: '',
    estado: 1,
    roles: [],
  };
  roles: Roles[] = [];
  registroEnProceso = false;
  rolesSeleccionados: string[] = [];
  empresas: Empresa[] = [];

  constructor(
    private navCtrl: NavController,
    private fireAuth: AngularFireAuth,
    private toastController: ToastController,
    private firestore: AngularFirestore,
    private rolesService: RolesService,
    private empresasService: EmpresasService,
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
    });
  }
  


  async registrar() {
    if (!this.email || !this.password) {
      this.mostrarError('Por favor, completa todos los campos.');
      return;
    }
  
    this.registroEnProceso = true;
  
    try {
      const result = await this.fireAuth.createUserWithEmailAndPassword(this.email, this.password);
      if (result.user) {
        console.log('Usuario registrado, ID:', result.user.uid);
  
        const nuevoUsuario: Usuario = {
          seg_ap: this.usuario.seg_ap,
          dir_usr: this.usuario.dir_usr,
          cel_usr: this.usuario.cel_usr,
          primer_ap: this.usuario.primer_ap,
          fec_nac: null,
          fec_reg_ing: null,
          nom_usr: this.usuario.nom_usr,
          dep_usr: this.usuario.dep_usr,
          correo_usr: this.email,
          id: result.user.uid,
          estado: 1,
          roles: this.rolesSeleccionados.map(id_rol => {
            return { 
              id_rol: id_rol,
              nom_rol: '' 
            };
          }),          
        };
  
        await this.firestore.collection('usuarios').doc(result.user.uid).set(nuevoUsuario);
  
        console.log('Usuario registrado en la colección "usuarios"');
        this.mostrarMensaje('Usuario registrado con éxito.');
        this.navCtrl.navigateBack('/gestionar-usuarios');
      } else {
        this.mostrarError('El registro no se completó con éxito.');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      this.mostrarError('Ha ocurrido un error durante el registro. Por favor, inténtalo de nuevo.');
    } finally {
      this.registroEnProceso = false;
    }
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

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      color: 'success',
    });
    toast.present();
  }

  backToPage() {
    this.navCtrl.navigateBack('/gestionar-usuarios');
  }
}