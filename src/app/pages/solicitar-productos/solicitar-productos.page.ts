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


@Component({
  selector: 'app-solicitar-productos',
  templateUrl: './solicitar-productos.page.html',
  styleUrls: ['./solicitar-productos.page.scss'],
})
export class SolicitarProductosPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  isModalOpen: boolean = false;
  productos: Producto[] = [];
  productosSeleccionados: Producto[] = [];

  id_usr!: string;
  usuarioEmpresas!: UsuarioEmpresas;
  empresaSeleccionada!: EmpresaUsrEp;
  solicitud!: Solicitud;
  usuario!: Usuario;

  constructor(
    private navCtrl: NavController,
    private usuariosService: UsuariosService,
    private productosService: ProductosService,
    private storage: StorageService,
    private solicitudesService: SolicitudesService
  ) {}

  ngOnInit() {
    this.getUID();
  }

  getUID() {
    this.storage.getStorageData('uid').subscribe(uid => {
      console.log('uid', uid);
      this.id_usr = uid;
      this.usuarioEmpresasPorId(this.id_usr);
    });
  }

  usuarioEmpresasPorId(uid: string) {
    this.usuariosService
      .getUsuarioEmpresas(uid)
      .subscribe((resp) => {
        this.usuarioEmpresas = resp[0];
        console.log('usuarioEmpresas', this.usuarioEmpresas);
        this.usuarioPorId();
      });
  }

  usuarioPorId() {
    this.usuariosService.getUsuarioPorId(this.id_usr).subscribe((resp) => {
      this.usuario = resp;
      console.log('usuario', this.usuario);
    });
  }

  backToPage() {
    this.navCtrl.navigateForward('home');
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if (this.productos.length == 0) {
      this.productosService.obtenerProductos().subscribe((resp) => {
        this.productos = resp; //as unknown as Producto[]
        console.log('productos', this.productos);
      });
    }
  }

  // checkboxClick(e: any, producto: Producto) {
  //   console.log(e.currentTarget.checked);
  //   console.log('producto', producto);
  //   if (e.currentTarget.checked) {
  //     const existe = this.productosSeleccionados.find(
  //       (p) => p.id === producto.id
  //     );
  //     if (existe == null) {
  //       this.productosSeleccionados.push(producto);
  //     }
  //   } else {
  //     this.productosSeleccionados = this.productosSeleccionados.filter(
  //       (p) => p.id !== producto.id
  //     );
  //   }
  //   console.log('this.productosSeleccionados', this.productosSeleccionados);
  // }
    checkboxClick(event: any, producto: Producto) {
    const isChecked = event.currentTarget.checked;
    const productoIndex = this.productosSeleccionados.findIndex((p) => p.id === producto.id);

    if (isChecked && productoIndex === -1) {
      // Si se marca el checkbox y el producto no está en la lista de seleccionados, agrégalo.
      this.productosSeleccionados.push(producto);
    } else if (!isChecked && productoIndex !== -1) {
      // Si se desmarca el checkbox y el producto está en la lista de seleccionados, quítalo.
      this.productosSeleccionados.splice(productoIndex, 1);
    }
  }

  onWillDismiss(event: Event) {
    //const ev = event as CustomEvent<OverlayEventDetail<string>>;
    /* if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    } */
  }

  solicitar() {
    console.log(this.productosSeleccionados);
    const productosSlt: ProductoSlt[] = [];
    for (let i = 0; i < this.productosSeleccionados.length; i++) {
      productosSlt.push({
        id_producto: this.productosSeleccionados[i].id,
        nom_prod: this.productosSeleccionados[i].nom_prod,
        prec_prod: this.productosSeleccionados[i].prec_prod,
        cantidad: null,
        total: null
      });
    }
    this.solicitud = {
      usuario: {
        id_usr: this.usuario.id,
        nom_usr: this.usuario.nom_usr,
        primer_ap: this.usuario.primer_ap,
        seg_ap: this.usuario.seg_ap
      },
      empresa: this.empresaSeleccionada,
      productos: productosSlt,
      estado: 1,
      comentario: null,
      fecha_solicitud: new Date(),
    }

    console.log('solicitud', this.solicitud);
    this.solicitudesService.crearSolicitud(this.solicitud).subscribe(resp => {
      console.log('resp crear solicitud', resp);      
      console.log('resp crear solicitud', resp.id);      
    });

  }

  handleChange(e: any) {
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
