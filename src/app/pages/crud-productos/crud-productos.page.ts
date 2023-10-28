import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/productos.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crud-productos',
  templateUrl: './crud-productos.page.html',
  styleUrls: ['./crud-productos.page.scss'],
})
export class CrudProductosPage implements OnInit {
  id_prod!: string;
  productos: Producto[] = [];
  isLoading: boolean = true;
  isVerProductoOpen: boolean = false;
  isEditarProductoOpen: boolean = false;
  mProducto!: Producto;
  // idCategoriaSeleccionada: string;

  constructor(
    private productosService: ProductosService,
    private navCtrl: NavController,

  ) { }

  ngOnInit() {
    this.obtenerProductos();

  }
  // obtenerProductos() {
  //   this.productosService.obtenerProductos().subscribe((resp) => {
  //     this.isLoading = false;
  //     this.productos = resp.filter((producto) => producto.estado === 1); // Filtra los productos activos
  //     console.log('Productos activos', this.productos);
  //   });
  // }
  
  obtenerProductos() {
    this.productosService.obtenerProductos().subscribe((resp) => {
      this.productos = resp;
      this.productos.sort((a, b) => {
        if (a.estado === 1 && b.estado === 0) {
          return -1; // a antes que b (activo antes que inactivo)
        } else if (a.estado === 0 && b.estado === 1) {
          return 1; // b antes que a (inactivo antes que activo)
        } else {
          return a.nom_prod.localeCompare(b.nom_prod); // Ordenar por nombre
        }
      });
  
      console.log('productos', this.productos);
      this.isLoading = false;
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
  
  eliminarProducto(producto: Producto) {
  // Cambiar el estado del producto a 0 (inactivo)
  producto.estado = 0;

  // Llama al servicio para actualizar el producto en la base de datos
  this.productosService.actualizarProducto(producto).subscribe((resp) => {
    console.log('Producto cambiado a estado inactivo:', resp);
    // Actualiza la lista de productos después de cambiar el estado
    this.obtenerProductos();
  });
}
backToPage() {
  this.navCtrl.navigateBack('home');
}
verProducto(producto: Producto) {
  this.isVerProductoOpen = true;
  this.mProducto = producto;
}

editarProducto(producto: Producto) {
  this.isEditarProductoOpen = true;
  this.mProducto = producto;
}

closeModal(event: any) {
  this.isVerProductoOpen = false;
  this.isEditarProductoOpen = false;
  console.log(event);
}


  // eliminarProducto(producto: Producto) {
  //   // Lógica para eliminar el producto
  //   this.productosService.eliminarProducto(producto.id);
  //   console.log('producto eliminado');
  // }
    

}
