import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Categoria } from 'src/app/interfaces/categorias.interface';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-crud-categorias',
  templateUrl: './crud-categorias.page.html',
  styleUrls: ['./crud-categorias.page.scss'],
})
export class CrudCategoriasPage implements OnInit {

  id_ctg!: string;
  categoria: Categoria[]=[];
  isLoading: boolean = true;
  isVerCategoriaOpen: boolean = false;
  isEditarCategoriaOpen: boolean = false;

  mCategoria!: Categoria;


  constructor(
    private navCtrl: NavController,
    private categoriaService: CategoriasService,
  ) { }

  ngOnInit() {
    this.obtenerCategorias();

  }

  // obtenerCategorias() {
  //   this.categoriaService.obtenerCategorias().subscribe((resp) => {
  //     this.isLoading=false;
  //     this.categoria = resp; 
  //     console.log('categorias', this.categoria);
  //   });
  // }
  obtenerCategorias() {
    this.categoriaService.obtenerCategorias().subscribe((resp) => {
      this.categoria = resp;
  
      // Ordenar las empresas primero por estado (1 antes que 0)
      // Luego, por nombre
      this.categoria.sort((a, b) => {
        if (a.estado === 1 && b.estado === 0) {
          return -1; // a antes que b (activo antes que inactivo)
        } else if (a.estado === 0 && b.estado === 1) {
          return 1; // b antes que a (inactivo antes que activo)
        } else {
          return a.nombre_ctg.localeCompare(b.nombre_ctg); // Ordenar por nombre
        }
      });
  
      console.log('empresas', this.categoria);
      this.isLoading = false;
    });
  }
  editarCategoria(categorias: Categoria) {
    this.isEditarCategoriaOpen = true;
    this.mCategoria = categorias;
  }
  verCategoria(categorias: Categoria) {
    this.isVerCategoriaOpen = true;
    this.mCategoria = categorias;
  }
  eliminarCategoria(categorias: Categoria) {
    categorias.estado = 0;
   
    this.categoriaService.actualizarCategoria(categorias).subscribe((resp) => {
      console.log('Categoria cambiado a estado inactivo:', resp);
      this.obtenerCategorias();
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

  closeModal(event: any) {
    this.isVerCategoriaOpen = false;
    this.isEditarCategoriaOpen = false;
    console.log(event);
  }

  backToPage(){
    this.navCtrl.navigateBack('home');
  }

}
