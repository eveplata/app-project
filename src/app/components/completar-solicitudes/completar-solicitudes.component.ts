import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductoSlt, Solicitud} from 'src/app/interfaces/solicitud.interface';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Producto } from 'src/app/interfaces/productos.interface';

@Component({
  selector: 'app-completar-solicitudes',
  templateUrl: './completar-solicitudes.component.html',
  styleUrls: ['./completar-solicitudes.component.scss'],
})
export class CompletarSolicitudesComponent  implements OnInit {

  @Input() isModalOpen!: boolean;
  @Input() solicitud!: Solicitud;
  @Input() productos!: ProductoSlt[];
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  fecha_entrega: string;
  // checkboxStates: { [key: string]: boolean } = {};

  // comentario: string = '';

  constructor(
    private solicitudesService: SolicitudesService,
    private navCtrl: NavController,
    private toastController: ToastController
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

  isChecked(idProducto: string): boolean {
    const exist = this.productos.find((p) => p.id_producto === idProducto);
    return exist != undefined ? true : false;
  }

// Función para manejar el cambio de estado del checkbox
checkboxClick(e: any, productoSlt: ProductoSlt) {
  const idProducto = productoSlt.id_producto;

  if (e.currentTarget.checked) {
    const existe = this.productos.find((p) => p.id_producto === idProducto);
    if (existe == null) {
      this.productos.push(productoSlt);
    }
  } else {
    this.productos = this.productos.filter(
      (p) => p.id_producto !== idProducto
    );
  }
}


}
