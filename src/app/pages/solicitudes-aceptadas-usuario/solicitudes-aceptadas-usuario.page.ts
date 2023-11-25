import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProductosService } from 'src/app/services/productos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Solicitud } from 'src/app/interfaces/solicitud.interface';

@Component({
  selector: 'app-solicitudes-aceptadas-usuario',
  templateUrl: './solicitudes-aceptadas-usuario.page.html',
  styleUrls: ['./solicitudes-aceptadas-usuario.page.scss'],
})
export class SolicitudesAceptadasUsuarioPage implements OnInit {


  id_usr!: string;
  isModalOpen: boolean = false;
  isLoading: boolean = true;
  hActivo!: Solicitud[];
  mSolicitud!: Solicitud;

  constructor(
    private navCtrl: NavController,
    // private usuariosService: UsuariosService,
    // private productosService: ProductosService,
    private storage: StorageService,
    private solicitudesService: SolicitudesService
    ){ }

  ngOnInit() {
    this.getUID();
  }

  getUID() {
    this.storage.getStorageData('uid').subscribe((uid) => {
      console.log('uid', uid);
      this.id_usr = uid; 
      this.ListSolicitudPorIdUsuario();
    });
  }

  ListSolicitudPorIdUsuario() {
    console.log(this.id_usr)
    this.solicitudesService
      .getSolicitudesPorUsuario(this.id_usr, [2])
      .subscribe((resp) => {
        console.log('historial Activo', resp); 
        this.hActivo = resp;
        //console.log('fecha', this.historial[0].fecha_solicitud);
        //console.log('historial', resp[0].fecha_solicitud['seconds']);
        
        this.isLoading = false
      });
  }

  getValorEstado(estado: number) {
    const nombresEstados = [
      { id: -1, valor: 'Rechazado' },
      { id: 0, valor: 'En Revision' },
      { id: 1, valor: 'Solicitud Activa' },
      { id: 2, valor: 'Aceptada' },
      { id: 3, valor: 'Entregado' },
    ];
    const obEstado = nombresEstados.find( e => e.id === estado);
    return obEstado != undefined ? obEstado.valor : 'Valor no encontrado'
  }

  openModal(hActivo:Solicitud) {
    this.isModalOpen = true;
    this.mSolicitud = hActivo;
  }

  closeModal(event: any) {
    console.log(event);
    this.isModalOpen = event;
  }


  backToPage() {
    this.navCtrl.navigateBack('home');
  }

}
