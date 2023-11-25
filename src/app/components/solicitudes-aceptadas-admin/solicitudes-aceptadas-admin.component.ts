import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Solicitud } from 'src/app/interfaces/solicitud.interface';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-solicitudes-aceptadas-admin',
  templateUrl: './solicitudes-aceptadas-admin.component.html',
  styleUrls: ['./solicitudes-aceptadas-admin.component.scss'],
})
export class SolicitudesAceptadasAdminComponent implements OnInit {
  @Input() isModalOpen!: boolean;
  @Input() solicitud!: Solicitud;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private solicitudesService: SolicitudesService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {

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
