import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Solicitud} from 'src/app/interfaces/solicitud.interface';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Producto } from 'src/app/interfaces/productos.interface';
import { ProductosService } from 'src/app/services/productos.service';


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
  productos: Producto[] = [];


  constructor(
    private solicitudesService: SolicitudesService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private productosService: ProductosService,
  ) { }

  ngOnInit() {
  }
  
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

  async aceptarSolicitud() {
    // Verifica si todas las cantidades de productos son mayores que cero
    const cantidadesValidas = this.solicitud.productos.every(producto => producto.cantidad! > 0);
  
    if (!cantidadesValidas) {
      // Si no todas las cantidades son mayores que cero, muestra un mensaje de error
      const toast = await this.toastController.create({
        message: 'Debes otorgar una cantidad válida para cada producto en la solicitud.',
        duration: 3000,
        position: 'bottom',
        color: 'danger',
      });
      toast.present();
      return; // No procedas si las cantidades no son válidas
    }
  
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
  
      this.navegarASolicitudesPendientes();
  
      this.isModalOpen = false;
      this.closeModal.emit(false);
    });
  }
  
  
// primera opcion
  // aceptarSolicitud() {
  //   this.solicitud.estado = 2;
  // this.solicitud.comentario = this.comentario;

  //   this.solicitudesService.actualizarSolicitud(this.solicitud).subscribe(async (response) => {
  //     const toast = await this.toastController.create({
  //       message: 'La solicitud ha sido aceptada exitosamente.',
  //       duration: 2000,
  //       position: 'bottom',
  //       color: 'success',
  //     });
  //     toast.present();
      
  //     this.navegarASolicitudesPendientes();

  //     this.isModalOpen = false;
  //     this.closeModal.emit(false);
  //   });
  // }

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
      
      this.navegarASolicitudesPendientes();

      this.isModalOpen = false;
      this.closeModal.emit(false);
    });
  }
  decrementarCantidad(producto: any) {
    if (producto.cantidad > 0) {
      producto.cantidad--;
    }
  }
  
  incrementarCantidad(producto: any) {
    producto.cantidad++;
  }

  verificarStockBajo(producto: any): boolean {
    return (producto?.stock_act || 0) < 5;
  }

  // verificarStockBajo(producto: Producto): boolean {
  //   console.log('Evaluando producto:', producto);
  //   const stockBajo = producto && producto.stock_act !== undefined && producto.stock_act < 5;
  //   console.log('¿Stock bajo?', stockBajo);
  //   return stockBajo;
  // }
  
  
  

  backToPage() {
    this.isModalOpen = false;
    this.closeModal.emit(this.isModalOpen);
  }
}
