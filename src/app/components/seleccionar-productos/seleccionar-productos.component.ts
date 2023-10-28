import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/interfaces/productos.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-seleccionar-productos',
  templateUrl: './seleccionar-productos.component.html',
  styleUrls: ['./seleccionar-productos.component.scss'],
})
export class SeleccionarProductosComponent implements OnInit {
  @Input() isModalOpen!: boolean;
  @Input() productosSeleccionados!: Producto[];
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() sProductos: EventEmitter<Producto[]> = new EventEmitter();

  productos: Producto[] = [];

  constructor(
    private productosService: ProductosService,
    private navCtrl: NavController,) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  // obtenerProductos() {
  //   this.productosService.obtenerProductos().subscribe((resp) => {
  //     this.productos = resp.filter((producto: Producto) => producto.estado === 1);
  //     console.log('productos', this.productos);
  //   });
  // }

  obtenerProductos() {
    this.productosService.obtenerProductos().subscribe((resp) => {
      // Filtrar productos con estado 1
      this.productos = resp.filter((producto: Producto) => producto.estado === 1);
  
      // Ordenar los productos por nombre
      this.productos.sort((a, b) => {
        const nombreA = a.nom_prod.toLowerCase();
        const nombreB = b.nom_prod.toLowerCase();
        return nombreA.localeCompare(nombreB);
      });
  
      console.log('Productos ordenados y filtrados:', this.productos);
    });
  }
  

  backToPage() {
    this.navCtrl.navigateBack('home');
  }



  cancel() {
    this.isModalOpen = false;
    this.closeModal.emit(this.isModalOpen);
  }

  confirm() {
    this.isModalOpen = false;
    this.closeModal.emit(this.isModalOpen);
    this.sProductos.emit(this.productosSeleccionados);
  }

  isChecked(idProducto: string) {
    const exist = this.productosSeleccionados.find(p => p.id === idProducto);
    //console.log('checked', idProducto+' - '+exist?.id);
    return exist!= undefined ? true : false;    
  }

  checkboxClick(e: any, producto: Producto) {
    console.log(e.currentTarget.checked);
    console.log('producto', producto);
    if (e.currentTarget.checked) {
      const existe = this.productosSeleccionados.find(
        (p) => p.id === producto.id
      );
      if (existe == null) {
        this.productosSeleccionados.push(producto);
      }
    } else {
      this.productosSeleccionados = this.productosSeleccionados.filter(
        (p) => p.id !== producto.id
      );
    }
    console.log('this.productosSeleccionados', this.productosSeleccionados);
  }
}
