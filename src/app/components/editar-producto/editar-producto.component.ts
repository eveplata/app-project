import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from 'src/app/interfaces/productos.interface';
import { NavController } from '@ionic/angular';
import { CategoriasService } from 'src/app/services/categorias.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { ProductoSlt, Solicitud } from 'src/app/interfaces/solicitud.interface';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss'],
})
export class EditarProductoComponent  implements OnInit {
  // id_prod!: string;
  @Input() producto!:Producto;
  @Input() isEditarProductoOpen!: boolean;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  categorias: any[] = [];
  id_prod!: string;


  constructor(    
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private solicitudesService: SolicitudesService,
    ) {
     }

  ngOnInit() {
    this.categoriasService.obtenerCategorias().subscribe((categorias) => {
      this.categorias = categorias;

    });
  }


  getValorEstado(estado: number) {
    const nombresEstados = [
      { id: 0, valor: 'Inactivo' },
      { id: 1, valor: 'Activo' },
    ];
    const obEstado = nombresEstados.find( e => e.id === estado);
    return obEstado != undefined ? obEstado.valor : 'Valor no encontrado'
  }


  // guardarCambios() {
  //   this.productosService.actualizarProducto(this.producto).subscribe((resp) => {
  //     console.log('Producto editado:', resp);
  //     this.isEditarProductoOpen = false; 
  //     this.closeModal.emit(this.isEditarProductoOpen); 
  //     this.actualizarSolicitudesConProducto(this.producto);
  //   });
  // }


  guardarCambios() {
    this.productosService.actualizarProducto(this.producto).subscribe((resp) => {
      console.log('Producto editado:', resp);
  
      // Después de actualizar el producto, busca y actualiza las solicitudes relacionadas
      this.actualizarSolicitudesConProducto(this.producto.id);
  
      this.isEditarProductoOpen = false;
      this.closeModal.emit(this.isEditarProductoOpen);
    });
  }
  
  actualizarSolicitudesConProducto(idProducto: string) {
    this.solicitudesService.getSolicitudesConProducto(idProducto).subscribe((solicitudes) => {
      solicitudes.forEach((solicitud) => {
        solicitud.productos.forEach((productoSlt) => {
          if (productoSlt.id_producto === idProducto) {
            productoSlt.nom_prod = this.producto.nom_prod;
            productoSlt.prec_prod = this.producto.prec_prod;
            productoSlt.stock_act = this.producto.stock_act;
            productoSlt.cont_prod = this.producto.cont_prod;
            productoSlt.uni_med_prod = this.producto.uni_med_prod;
            productoSlt.marca = this.producto.marca;
            productoSlt.imagen = this.producto.imagen;
          }
        });
  
        this.solicitudesService.actualizarSolicitud(solicitud).subscribe((solicitudActualizada) => {
          console.log('Solicitud editada:', solicitudActualizada);
        });
      });
    });
  }
  
 
  
  backToPage() {
    // this.navCtrl.navigateBack('historial-solicitud');
    this.isEditarProductoOpen = false;
    this.closeModal.emit(this.isEditarProductoOpen);
  }

}
