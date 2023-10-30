import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProductosService } from 'src/app/services/productos.service';
import { CategoriasPdt, Producto } from 'src/app/interfaces/productos.interface';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categoria } from 'src/app/interfaces/categorias.interface';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.page.html',
  styleUrls: ['./crear-productos.page.scss'],
})
export class CrearProductosPage implements OnInit {
  categorias: Categoria[] = [];
  producto: Producto = {
    nom_prod: '',
    stock_act: 0,
    prec_prod: 0,
    estado: 1,
    stock_min: 0,
    cant_comp_prod: 0,
    categorias: {
      id_categoria:'',
      nombre: '', 
    },
    uni_med_prod: '',
    tipo_prod: '',
    cont_prod: 0,
    marca: '',
    imagen: 'URL de la imagen',
    id: '',
  };
  agregarProducto: boolean = false;
  nuevaImagen = '';
  

  constructor(
    private navCtrl: NavController,
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private storageservice: StorageService,     

  ) { }

  ngOnInit() {

    this.categoriasService.obtenerCategorias().subscribe((categorias) => {
      this.categorias = categorias.filter((categorias) => categorias.estado === 1);
  
    });
  }
  crearProducto() {
    if (this.agregarProducto) {
      return; // Evitar múltiples clics
    }
  
    this.agregarProducto = true;
  
    if (this.categorias.length > 0) {
      this.producto.categorias = {
        id_categoria: this.categorias[0].id,
        nombre: this.categorias[0].nombre_ctg
      };
    }
  
    // función para agregar el producto
    this.productosService.crearProducto(this.producto).subscribe(
      (docRef) => {
        console.log('Producto agregado con ID:', docRef.id);
  
        this.agregarProducto = false;
  
        this.navCtrl.navigateForward('/crud-productos');
      },
      (error) => {
        console.error('Error al agregar el producto:', error);
        this.agregarProducto = false;
      }
    );
  }
  
  

  async newImage(event: any) {
    if (event && event.target && event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = ((image) => {
        if (image.target) {
          this.nuevaImagen = image.target.result as string;

          
        }
      });
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  
  
  backToPage() {
    this.navCtrl.navigateBack('/crud-productos');
  }

  
  

}
