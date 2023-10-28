import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Solicitud} from 'src/app/interfaces/solicitud.interface';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-especificar-solicitudes',
  templateUrl: './especificar-solicitudes.component.html',
  styleUrls: ['./especificar-solicitudes.component.scss'],
})
export class EspecificarSolicitudesComponent  implements OnInit {

  @Input() isModalOpen!: boolean;
  @Input() solicitud!: Solicitud;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  comentario: string = '';

  constructor(
    private solicitudesService: SolicitudesService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  // getCurrentDate(): string {
  //   const currentDate = new Date();
  //   const day = currentDate.getDate().toString().padStart(2, '0');
  //   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  //   const year = currentDate.getFullYear();
  //   return `${day}/${month}/${year} `;
  // }
  // guardarComentario() {
  //   this.solicitud.estado = this.solicitud.estado === 2 ? 2 : -1; // 2 Aceptar, -1 Rechazar
  //   this.solicitud.comentario = this.comentario;
  
  //   this.solicitudesService.actualizarSolicitud(this.solicitud).subscribe(async (response) => {
  //     if (this.solicitud.estado === 2) {
  //       const toast = await this.toastController.create({
  //         message: 'La solicitud ha sido aceptada exitosamente.',
  //         duration: 2000,
  //         position: 'bottom',
  //         color: 'success',
  //       });
  //       toast.present();
  //     } else if (this.solicitud.estado === -1) {
  //       const toast = await this.toastController.create({
  //         message: 'La solicitud ha sido rechazada exitosamente.',
  //         duration: 3000,
  //         position: 'bottom',
  //         color: 'danger',
  //       });
  //       toast.present();
  //     }
  
  //     // Llamar a la función de navegación
  //     this.navegarASolicitudesPendientes();
  
  //     this.isModalOpen = false;
  //   });
  // }
  
// primera opcion
  aceptarSolicitud() {
    this.solicitud.estado = 2;
  this.solicitud.comentario = this.comentario;

    this.solicitudesService.actualizarSolicitud(this.solicitud).subscribe(async (response) => {
      const toast = await this.toastController.create({
        message: 'La solicitud ha sido aceptada exitosamente.',
        duration: 2000,
        position: 'bottom',
        color: 'success',
      });
      toast.present();
      
      // Llamar a la función de navegación
      this.navegarASolicitudesPendientes();

      // Cierra el modal
      this.isModalOpen = false;
      this.closeModal.emit(false);
    });
  }

  navegarASolicitudesPendientes() {
    this.navCtrl.navigateForward('/solicitudes-pendientes');
  }

  rechazarSolicitud(){

    this.solicitud.estado = -1;
    this.solicitud.comentario = this.comentario;

    this.solicitudesService.actualizarSolicitud(this.solicitud).subscribe(async (resp) => {
      const toast = await this.toastController.create({
        message: 'La solicitud ha sido rechazada exitosamente.',
        duration: 2000,
        position: 'bottom',
        color: 'danger',
      });
      toast.present();
      
      // Llamar a la función de navegación
      this.navegarASolicitudesPendientes();

      // Cierra el modal
      this.isModalOpen = false;
      this.closeModal.emit(false);
    });
  }

  backToPage() {
    this.isModalOpen = false;
    this.closeModal.emit(this.isModalOpen);
  }
}
