import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { Producto } from 'src/app/interfaces/productos.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-solicitar-productos',
  templateUrl: './solicitar-productos.page.html',
  styleUrls: ['./solicitar-productos.page.scss'],
})
export class SolicitarProductosPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  isModalOpen: boolean = false;
  productos: Producto[] = [];
  productosSeleccionados: Producto[] = [];

  constructor(
    private navCtrl: NavController,
    //private usuariosService: UsuariosService
    private productosService: ProductosService
  ) {}

  ngOnInit() {
    //this.usuariosService.prueba();
  }

  backToPage() {
    this.navCtrl.navigateBack('/home');
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if (this.productos.length == 0) {
      this.productosService.obtenerProductos().subscribe((resp) => {
        this.productos = resp; //as unknown as Producto[]
        console.log('productos', this.productos);
      });
    }
  }

  checkboxClick(e: any, producto: Producto) {
    console.log(e.currentTarget.checked);
    console.log('producto', producto);
    if (e.currentTarget.checked) {
      const existe = this.productosSeleccionados.find(
        (p) => p.id === producto.id
      );
      if(existe == null) {
        this.productosSeleccionados.push(producto);
      }
    } else {
      this.productosSeleccionados = this.productosSeleccionados.filter(
        (p) => p.id !== producto.id
      );
    }
    console.log('this.productosSeleccionados', this.productosSeleccionados);
  }

  onWillDismiss(event: Event) {
    //const ev = event as CustomEvent<OverlayEventDetail<string>>;
    /* if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    } */
  }

  solicitar() {
    console.log(this.productosSeleccionados);    
  }
}
