import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Categoria } from 'src/app/interfaces/categorias.interface';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-crear-categorias',
  templateUrl: './crear-categorias.page.html',
  styleUrls: ['./crear-categorias.page.scss'],
})
export class CrearCategoriasPage implements OnInit {
  categoria: Categoria = {
    id: '',
    nombre_ctg: '',
    descrip_ctg: '',
    estado: 1, 
  };
  agregarCategoria: boolean = false;


  constructor(
    private navCtrl: NavController,
    private categoriasService: CategoriasService,

  ) { }

  ngOnInit() {
  }
  crearCategoria() {

    if (this.agregarCategoria) {
      return; 
    }

    this.agregarCategoria = true;

    this.categoriasService.crearCategoria(this.categoria).subscribe(
      (docRef) => {
        console.log('Producto agregado con ID:', docRef.id);


        this.agregarCategoria = false; 
      },
      (error) => {
        console.error('Error al agregar el producto:', error);
        this.agregarCategoria = false; 
      }
    );  

  }

  backToPage() {
    this.navCtrl.navigateBack('/crud-categorias');
  }

}
