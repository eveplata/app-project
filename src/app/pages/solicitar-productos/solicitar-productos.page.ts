import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { Producto } from 'src/app/interfaces/productos.interface';
import { ProductoSlt, Solicitud } from 'src/app/interfaces/solicitud.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { EmpresaUsrEp, UsuarioEmpresas } from 'src/app/interfaces/usuarioEmpresas.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-solicitar-productos',
  templateUrl: './solicitar-productos.page.html',
  styleUrls: ['./solicitar-productos.page.scss'],
})

export class SolicitarProductosPage implements OnInit {
  // uni_med_prod: string = ' ';
  id_usr!: string;
  productosSeleccionados: Producto[] = [];
  usuarioEmpresas!: UsuarioEmpresas;
  empresaSeleccionada!: EmpresaUsrEp;
  solicitud!: Solicitud;
  usuario!: Usuario;
  isLoading: boolean = true;
  isModalOpen: boolean = false;
  solicitudEnProceso = false;

  constructor(
    private navCtrl: NavController,
    private usuariosService: UsuariosService,
    private productosService: ProductosService,
    private storage: StorageService,
    private solicitudesService: SolicitudesService,
    private alertController: AlertController,

  ) {}

  ngOnInit() {
    this.getUID();
  }

  getUID() {
    this.storage.getStorageData('uid').subscribe((uid) => {
      console.log('uid', uid);
      this.id_usr = uid;
      this.usuarioEmpresasPorId(this.id_usr);
    });
  }

  usuarioEmpresasPorId(uid: string) {
    this.usuariosService.getUsuarioEmpresas(uid).subscribe((resp) => {
      this.usuarioEmpresas = resp[0];
      console.log('usuarioEmpresas', this.usuarioEmpresas);
      this.usuarioPorId();
    });
  }

  usuarioPorId() {
    this.usuariosService.getUsuarioPorId(this.id_usr).subscribe((resp) => {
      this.isLoading = false;
      this.usuario = resp;
      console.log('usuario', this.usuario);
    });
  }

  backToPage() {
    this.navCtrl.navigateBack('home');
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(event: any) {
    console.log(event);
    this.isModalOpen = event;
  }

  sProductos(event: Producto[]){
    console.log('emit de productos seleccionados', event); 
    this.productosSeleccionados = event;
  }
  limpiarProductosSeleccionados() {
    this.productosSeleccionados = [];
  }
  

  async solicitar() {
    if (this.solicitudEnProceso) {
      return;
    }
  
    if (this.productosSeleccionados.length === 0) {
      const alert = await this.alertController.create({
        header: 'Productos no seleccionados',
        message: 'Debes seleccionar al menos un producto para enviar la solicitud.',
        buttons: ['OK']
      });
  
      await alert.present();
      return;
    }
  
    const fecha = new Date();
    if ([1, 2, 3, 4, 5, 10].includes(fecha.getDate())) {
      const productosSlt: ProductoSlt[] = [];
      for (let i = 0; i < this.productosSeleccionados.length; i++) {
        productosSlt.push({
          id_producto: this.productosSeleccionados[i].id,
          nom_prod: this.productosSeleccionados[i].nom_prod,
          prec_prod: this.productosSeleccionados[i].prec_prod,
          cantidad: null,
          total: null,
          cont_prod: this.productosSeleccionados[i].cont_prod,
          uni_med_prod: this.productosSeleccionados[i].uni_med_prod,
          marca: this.productosSeleccionados[i].marca,
          imagen: this.productosSeleccionados[i].imagen,
          stock_act: this.productosSeleccionados[i].stock_act,
          entregado: false
        });
      }
  
      this.solicitud = {
        usuario: {
          id_usr: this.usuario.id || '',
          nom_usr: this.usuario.nom_usr,
          primer_ap: this.usuario.primer_ap,
          seg_ap: this.usuario.seg_ap || ''
        },
        empresa: this.empresaSeleccionada,
        productos: productosSlt,
        estado: 0,
        comentario: null,
        fecha_solicitud: new Date(),
        id_emp: this.empresaSeleccionada.id_emp,
        id_usr: this.usuario.id || ''
      };
  
      console.log('solicitud', this.solicitud);
  
      try {
        const resp = await this.solicitudesService.crearSolicitud(this.solicitud).toPromise();
        console.log('resp crear solicitud', resp.id);
  
        const alert = await this.alertController.create({
          header: 'Solicitud Enviada',
          message: 'La solicitud ha sido enviada con éxito.',
          buttons: ['OK']
        });
        this.productosSeleccionados = [];
  
        await alert.present();
      } catch (error) {
        console.error('Error al crear la solicitud', error);
      }
  
      this.solicitudEnProceso = false;
    } else {
      const alert = await this.alertController.create({
        header: 'Fuera de la Fecha',
        message: 'Estás fuera de la fecha para realizar solicitudes.',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }
  
  

  // solicitar() {
  //   if (this.solicitudEnProceso) {
  //     return;
  //   }
  //   console.log(this.productosSeleccionados);
  //   const fecha = new Date(); //recupera la fecha actual
  //   //fecha.getDate() = recupera el dia ejemplo de la fecha 25/10/2023 recupera 25 que es la fecha
  //   console.log('solicitudes', fecha);
  //   console.log('solicitudes', fecha.getDate());
  //   console.log('solicitudes', [1,2,3,4,5].includes(fecha.getDate()));
    

  //   if([1,2,3,4,5].includes(fecha.getDate())){
  //     const productosSlt: ProductoSlt[] = [];
  //     for (let i = 0; i < this.productosSeleccionados.length; i++) {
  //       productosSlt.push({
  //         id_producto: this.productosSeleccionados[i].id,
  //         nom_prod: this.productosSeleccionados[i].nom_prod,
  //         prec_prod: this.productosSeleccionados[i].prec_prod,
  //         cantidad: null,
  //         total: null,
  //         cont_prod: this.productosSeleccionados[i].cont_prod,
  //         uni_med_prod: this.productosSeleccionados[i].uni_med_prod,
  //         marca: this.productosSeleccionados[i].marca,
  //         imagen: this.productosSeleccionados[i].imagen,
  //         entregado: false
  //       });
  //     }

  //     this.solicitud = {
  //       usuario: {
  //         id_usr: this.usuario.id || '',
  //         nom_usr: this.usuario.nom_usr,
  //         primer_ap: this.usuario.primer_ap,
  //         seg_ap: this.usuario.seg_ap || ''
  //       },
  //       empresa: this.empresaSeleccionada,
  //       productos: productosSlt,
  //       estado: 0,
  //       comentario: null,
  //       fecha_solicitud: new Date(),
  //       id_emp: this.empresaSeleccionada.id_emp,
  //       id_usr: this.usuario.id || ''
  //     };
      

  //     console.log('solicitud', this.solicitud);
  //     this.solicitudesService.crearSolicitud(this.solicitud).subscribe((resp) => {
  //       console.log('resp crear solicitud', resp);
  //       console.log('resp crear solicitud', resp.id);
  //       alert('La solicitud ha sido enviada con éxito.');
  //     });
      // stock
      // for (const producto of this.productosSeleccionados) {
      //   this.productosService.actualizarStock(producto.id,1);
      //   console.log(`Stock actualizado para ${producto.nom_prod}`);
      //   console.log(`Stock actualizado para ${producto.stock_act
      //   }`);
      // }
  //   } else {
  //     console.log('No esta en la fecha para realizar solicitudes');     
  //     alert('Fuera de la fecha para realizar solicitudes.'); 
  //   }
  // }

  
  handleChange(e: any) {
  console.log('handleChange activado');
  this.empresaSeleccionada = e.detail.value;
  console.log('empresaSeleccionada', this.empresaSeleccionada);
}
  handleCancel() {
    console.log('ionCancel fired');
  }

  handleDismiss() {
    console.log('ionDismiss fired');
  }
}
