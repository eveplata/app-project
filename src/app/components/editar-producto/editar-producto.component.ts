import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from 'src/app/interfaces/productos.interface';
import { NavController } from '@ionic/angular';
import { CategoriasService } from 'src/app/services/categorias.service';

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


  constructor(    
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
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


  guardarCambios() {
    // Llama a tu servicio para guardar los cambios en el producto
    this.productosService.actualizarProducto(this.producto).subscribe((resp) => {
      console.log('Producto editado:', resp);
      // Cierra la vista de edición
      this.isEditarProductoOpen = false; // Cierra el modal
      this.closeModal.emit(this.isEditarProductoOpen); // Emite el evento para cerrar el modal
    });
  }
  backToPage() {
    // this.navCtrl.navigateBack('historial-solicitud');
    this.isEditarProductoOpen = false;
    this.closeModal.emit(this.isEditarProductoOpen);
  }

}
