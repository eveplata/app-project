import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';
import { NavController } from '@ionic/angular';
import { Categoria } from '../../interfaces/categorias.interface';


@Component({
  selector: 'app-ver-categoria',
  templateUrl: './ver-categoria.component.html',
  styleUrls: ['./ver-categoria.component.scss'],
})
export class VerCategoriaComponent  implements OnInit {
  @Input() categoria!:Categoria;
  @Input() isModalOpen!: boolean;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private categoriaService: CategoriasService,
    private navCtrl: NavController,


  ) { }

  ngOnInit() {}
  
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
