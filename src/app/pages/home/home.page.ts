import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { from } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loading: boolean = true;
  uid!: string;
  usuario!: Usuario;
  currentDate: Date = new Date();
  isButtonDisabled: boolean = false; 



  constructor(
    private loginService: LoginService,
    private usuarioService: UsuariosService,
    private navCtrl: NavController,
    private storage: StorageService,
    private alertController: AlertController
  ) {}

  ngOnInit() {

    this.checkDate();

    /*this.loginService.getUserAuth().subscribe(
      (user) => {
        console.log('get user home', user);
      }
    );*/
    this.storage.getStorageData('uid').subscribe((resp) => {
      console.log('uid', resp);
      this.uid = resp;
      this.obtenerUsuarioPorId(this.uid);
    });
    /*this.loginService.getUserAuth().subscribe((resp) => {
      console.log('AUTH', resp);
    });*/
  }
  


  checkDate() {
    const currentDay = this.currentDate.getDate();
    if (currentDay > 5) {
      // Deshabilitar el botón si es después del día 5
      this.isButtonDisabled = true;
    } else {
      // Habilitar el botón si es antes del día 5
      this.isButtonDisabled = false;
    }
  }

  
  obtenerUsuarioPorId(uid: string) {
    this.usuarioService.getUsuarioPorId(uid).subscribe( resp => {
      console.log('usuario', resp);
      this.usuario = resp;
      this.loading = false;
    });
  }
  // restringir por fecha
  // async mostrarAlertaSolicitarProductos() {
  //   const fechaActual = new Date();
  //   const diaDelMes = fechaActual.getDate();
  
  //   if (diaDelMes > 5) {
  //     const alert = await this.alertController.create({
  //       header: 'Solicitud no disponible',
  //       message: 'La fecha de solicitud ha expirado.',
  //       buttons: ['OK']
  //     });
  
  //     await alert.present();
  //   } else {
  //     this.navigateToPage('/solicitar-productos');
  //   }
  // }
  cerrarSession() {
    console.log('clic');
    this.loginService
      .logout()
      .then((resp) => {
        console.log(resp);
        this.navCtrl.navigateRoot('login');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  navigateToPage(ruta: string) {
    this.navCtrl.navigateForward(ruta);
  }

  validarRol(rolesValidos: string[]) {
    //'Administrador',
    const nomRoles: string[] = [];
    for (let i = 0; i < this.usuario.roles.length; i++) {
      const rol = rolesValidos.includes(this.usuario.roles[i].nom_rol)
      if(rol) {
        nomRoles.push(this.usuario.roles[i].nom_rol)
      }
    }

    return nomRoles.length == 0 ? false : true
    
  }

  solicitar() {}
}
