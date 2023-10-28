import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Solicitud} from 'src/app/interfaces/solicitud.interface';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-revisar-solicitud',
  templateUrl: './revisar-solicitud.component.html',
  styleUrls: ['./revisar-solicitud.component.scss'],
})
export class RevisarSolicitudComponent  implements OnInit {

  @Input() isModalOpen!: boolean;
  @Input() solicitud!: Solicitud;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  fecha_entrega: string; 
  

  constructor(
    private solicitudesService: SolicitudesService,
    private navCtrl: NavController,
  ) {
    this.fecha_entrega = this.getCurrentDate();

   }

  ngOnInit() {}

  getCurrentDate(): string {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString(); // Convierte el año a cadena
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const amOrPm = (currentDate.getHours() < 12) ? 'AM' : 'PM';
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${amOrPm}`;
  }
  

  aceptarSolicitud() {
    this.solicitud.estado = 3;
    this.solicitud.fecha_entrega = this.getCurrentDate(); 

    this.solicitudesService.actualizarSolicitud(this.solicitud).subscribe((resp) => {
      console.log('Solicitud aceptada');
      this.isModalOpen = false;
      this.closeModal.emit(this.isModalOpen);
    });
  }
  
  
  guardarSolicitud(){
    this.solicitud.estado = 1;
    this.solicitud.fecha_entrega = this.getCurrentDate(); 

    this.solicitudesService.actualizarSolicitud(this.solicitud).subscribe((resp) => {
      console.log('Solicitud Activa');
      this.isModalOpen = false;
      this.closeModal.emit(this.isModalOpen);
    });

  }

  // getCurrentDate(): string {
  //   const currentDate = new Date();
  //   const day = currentDate.getDate().toString().padStart(2, '0');
  //   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  //   const year = currentDate.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }

  backToPage() {
    this.navCtrl.navigateBack('solicitudes-activas');
    this.isModalOpen = false;
    this.closeModal.emit(this.isModalOpen);
  }

  
}
