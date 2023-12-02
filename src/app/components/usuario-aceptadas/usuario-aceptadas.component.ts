import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductoSlt, Solicitud} from 'src/app/interfaces/solicitud.interface';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { NavController } from '@ionic/angular';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/interfaces/productos.interface';

@Component({
  selector: 'app-usuario-aceptadas',
  templateUrl: './usuario-aceptadas.component.html',
  styleUrls: ['./usuario-aceptadas.component.scss'],
})
export class UsuarioAceptadasComponent  implements OnInit {

  @Input() isModalOpen!: boolean;
  @Input() solicitud!: Solicitud;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  //@Output() productosSeleccionados: EventEmitter<ProductoSlt[]> = new EventEmitter();

  fecha_entrega: string;
  productos: Producto[] = [];
  productosActualizar: Producto[] = [];
  

  constructor(
    private solicitudesService: SolicitudesService,
    private navCtrl: NavController,
    private productosService: ProductosService,
  ) {
    this.fecha_entrega = this.getCurrentDate();

   }

  ngOnInit() {
    console.log('solicitud', this.solicitud);
    this.solicitud.productos.forEach((p) => {
      if(p.entregado === false) {
        this.productosService.getProductosPorId(p.id_producto).subscribe(resp => {
          this.productos.push(resp);
        });
      }
    });
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
  

  aceptarSolicitud() {
    this.solicitud.estado = 3;
    this.solicitud.fecha_entrega = this.getCurrentDate();
    
    this.actualizarStock();

    this.solicitudesService.actualizarSolicitud(this.solicitud).subscribe((resp) => {
      console.log('Solicitud aceptada');
      this.isModalOpen = false;
      //this.closeModal.emit(this.isModalOpen);
      this.navCtrl.navigateBack('/home');
    });
  }

  guardarSolicitud(){
    this.solicitud.estado = 1;
    this.solicitud.fecha_entrega = this.getCurrentDate(); 
    
    this.actualizarStock();

    this.solicitudesService.actualizarSolicitud(this.solicitud).subscribe((resp) => {
      console.log('Solicitud Activa');
      this.isModalOpen = false;
      //this.closeModal.emit(this.isModalOpen);
      this.navCtrl.navigateBack('/home');
    });
  }

  actualizarStock() {
    console.log('productos', this.productos);
    let prodActu: Producto[] = [];
    if(this.productos.length > 0) {
      this.solicitud.productos.forEach((sp) => {
        const producto = this.productos.find(p => sp.id_producto === p.id);
        if(producto && sp.entregado === true) {
          producto.stock_act = producto.stock_act - (sp.cantidad || 0);
          prodActu.push(producto);
        }        
      });
    }
    console.log('Productos a actualizar',prodActu);
    prodActu.forEach((p) => {
      this.productosService.actualizarProducto(p);
    });
  }
  
  backToPage() {
    //this.navCtrl.navigateBack('solicitudes-aceptadas-usuario');
    this.isModalOpen = false;
    this.navCtrl.navigateBack('/home');
    //this.closeModal.emit(this.isModalOpen);
    // this.solicitud.estado = 1;
    // this.solicitud.fecha_entrega = this.getCurrentDate(); 

    // this.solicitudesService.actualizarSolicitud(this.solicitud).subscribe((resp) => {
    //   console.log('Solicitud Activa');
    //   this.isModalOpen = false;
    //   this.closeModal.emit(this.isModalOpen);
    // });
  }
 

  checkboxClick(e: any, producto: ProductoSlt) {
    console.log(e.currentTarget.checked);
    //console.log('producto', producto);
    for (let i = 0; i < this.solicitud.productos.length; i++) {
      if(this.solicitud.productos[i].id_producto === producto.id_producto) {
        this.solicitud.productos[i].entregado = e.currentTarget.checked;
      }
    }

    console.log('this.solicitud', this.solicitud);

    //this.productosSeleccionados.emit(this.solicitud.productos.filter(p => p.entregado));
  }
  
  // checkboxClick(e: any, producto: ProductoSlt) {
  //   console.log(e.currentTarget.checked);
  //   console.log('producto', producto);
  //   for (let i = 0; i < this.solicitud.productos.length; i++) {
  //     if (this.solicitud.productos[i]?.id_producto === producto.id_producto) {
  //       this.solicitud.productos[i].entregado = e.currentTarget.checked;
  //       if (e.currentTarget.checked) {
  //         this.solicitud.productos[i].stock_act = (this.solicitud.productos[i].stock_act || 0) - (this.solicitud.productos[i].cantidad || 0);
  //       } else {
  //         this.solicitud.productos[i].stock_act = (this.solicitud.productos[i].stock_act || 0) + (this.solicitud.productos[i].cantidad || 0);
  //       }
  //     }
  //   }
  //   console.log('this.solicitud', this.solicitud);
  
  //   this.productosSeleccionados.emit(this.solicitud.productos.filter((p) => p.entregado));
  // }
  
  

}
