import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from 'src/app/interfaces/productos.interface';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.scss'],
})
export class VerProductoComponent  implements OnInit {

  id_prod!: string;
  @Input() producto!:Producto;
  @Input() isModalOpen!: boolean;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private productosService: ProductosService,
    private navCtrl: NavController,

  ) {
    
  }

  ngOnInit() { 
  }
  getValorEstado(estado: number) {
    const nombresEstados = [
      { id: 0, valor: 'Inactivo' },
      { id: 1, valor: 'Activo' },
    ];
    const obEstado = nombresEstados.find( e => e.id === estado);
    return obEstado != undefined ? obEstado.valor : 'Valor no encontrado'
  }

  backToPage() {
    //this.navCtrl.navigateBack('crud-producto');
    this.isModalOpen = false;
    this.closeModal.emit(this.isModalOpen);
  }

}
