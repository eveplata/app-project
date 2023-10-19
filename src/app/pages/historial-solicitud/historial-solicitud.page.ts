import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { EmpresaUsrEp, UsuarioEmpresas } from 'src/app/interfaces/usuarioEmpresas.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Producto } from 'src/app/interfaces/productos.interface';
import { ProductoSlt, Solicitud } from 'src/app/interfaces/solicitud.interface';


@Component({
  selector: 'app-historial-solicitud',
  templateUrl: './historial-solicitud.page.html',
  styleUrls: ['./historial-solicitud.page.scss'],
})
export class HistorialSolicitudPage implements OnInit {
  id_usr!: string;
  solicitud!: Solicitud;
  usuario!: Usuario;
  isLoading: boolean = true;
  isModalOpen: boolean = false;

  constructor(
    private navCtrl: NavController,
    private usuariosService: UsuariosService,
    private productosService: ProductosService,
    private storage: StorageService,
    private solicitudesService: SolicitudesService
    ) { }

  ngOnInit() {
  }

  backToPage() {
    this.navCtrl.navigateBack('home');
  }

  openModal() {
    this.isModalOpen = true;
    this.isLoading = false;
  }

  closeModal(event: any) {
    console.log(event);
    this.isModalOpen = event;
  }


}
