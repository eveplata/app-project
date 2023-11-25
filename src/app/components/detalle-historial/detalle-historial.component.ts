import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Solicitud } from 'src/app/interfaces/solicitud.interface';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-detalle-historial',
  templateUrl: './detalle-historial.component.html',
  styleUrls: ['./detalle-historial.component.scss'],
})
export class DetalleHistorialComponent implements OnInit {

  @Input() isModalOpen!: boolean;
  @Input() solicitud!: Solicitud;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private solicitudesService: SolicitudesService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {

  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year} `;
  }


  cancel() {
    this.isModalOpen = false;
    this.closeModal.emit(this.isModalOpen);
  }

  confirm() {
    this.isModalOpen = false;
    this.closeModal.emit(this.isModalOpen);
  }

  backToPage() {
    // this.navCtrl.navigateBack('historial-solicitud');
    this.isModalOpen = false;
    this.closeModal.emit(this.isModalOpen);
  }
}

