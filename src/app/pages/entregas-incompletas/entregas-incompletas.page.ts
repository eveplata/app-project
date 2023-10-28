import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Solicitud} from 'src/app/interfaces/solicitud.interface';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-entregas-incompletas',
  templateUrl: './entregas-incompletas.page.html',
  styleUrls: ['./entregas-incompletas.page.scss'],
})
export class EntregasIncompletasPage implements OnInit {

  id_usr!: string;
  isModalOpen: boolean = false;
  isLoading: boolean = true;
  solicitudes: Solicitud[] = [];
  mSolicitud!: Solicitud;



  constructor(
    private navCtrl: NavController,
    private storage: StorageService,
    private solicitudesService: SolicitudesService,
  ) { 

  }

  ngOnInit() {
    this.listarSolicitudes();
  }

  listarSolicitudes() {
    const estadosPermitidos = [ 1];
    this.solicitudesService.getSolicitudes().subscribe((solicitudes: Solicitud[]) => {
      // Filtrar las solicitudes por estado 0, 1 y 2
      this.solicitudes = solicitudes.filter(solicitud => estadosPermitidos.includes(solicitud.estado));
      this.isLoading = false;
    });
  }
  

  // listarSolicitudes() {
  //   this.solicitudesService.getSolicitudes().subscribe((solicitudes) => {
  //     this.solicitudes = solicitudes;
  //     this.isLoading = false;
  //   });
  // }
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


  openModal(solicitud:Solicitud) {
    this.isModalOpen = true;
    this.mSolicitud = solicitud;
  }

  closeModal(event: any) {
    console.log(event);
    this.isModalOpen = event;
  }
  
  backToPage() {
    this.navCtrl.navigateBack('home');
  }

}