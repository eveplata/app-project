import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categorias.interface';
import { CategoriasService } from 'src/app/services/categorias.service';


@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss'],
})
export class EditarCategoriaComponent  implements OnInit {
  @Input() categoria!:Categoria;
  @Input() isEditarCategoriaOpen!: boolean;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private categoriasService: CategoriasService,

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


  guardarCambios() {
    this.categoriasService.actualizarCategoria(this.categoria).subscribe((resp) => {
      console.log('Categoria editado:', resp);
      this.isEditarCategoriaOpen = false; 
      this.closeModal.emit(this.isEditarCategoriaOpen); 
    });
  }

  backToPage() {
    // this.navCtrl.navigateBack('historial-solicitud');
    this.isEditarCategoriaOpen = false;
    this.closeModal.emit(this.isEditarCategoriaOpen);
  }

}
