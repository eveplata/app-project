import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Solicitud} from 'src/app/interfaces/solicitud.interface';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reporte-historial',
  templateUrl: './reporte-historial.component.html',
  styleUrls: ['./reporte-historial.component.scss'],
})
export class ReporteHistorialComponent  implements OnInit {

  @Input() isModalOpen!: boolean;
  @Input() solicitud!: Solicitud;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  fecha_entrega: string; 
  // comentario: string = '';

  constructor(
    private solicitudesService: SolicitudesService,
    private navCtrl: NavController,
  ) {
    this.fecha_entrega = this.getCurrentDate();

   }

  ngOnInit() {
    
  }

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

  backToPage() {
    // this.navCtrl.navigateBack('historial-solicitud');
    this.isModalOpen = false;
    this.closeModal.emit(this.isModalOpen);
  }

}