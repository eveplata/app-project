import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Empresa } from 'src/app/interfaces/empresas.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { StorageService } from 'src/app/services/storage.service';




@Component({
  selector: 'app-gestionar-empresas',
  templateUrl: './gestionar-empresas.page.html',
  styleUrls: ['./gestionar-empresas.page.scss'],
})
export class GestionarEmpresasPage implements OnInit {
  id_emp!: string;
  isModalOpen: boolean = false;
  isLoading: boolean = true;
  isVerEmpresaOpen: boolean = false;
  isEditarEmpresaOpen: boolean = false;
  empresas: Empresa[] = [];
  mEmpresa!: Empresa;


  constructor(
    private navCtrl: NavController,
    private storage: StorageService,
    private empresaService: EmpresasService,
  ) { }

  ngOnInit() {
    this.obtenerEmpresas();
  }
  // obtenerEmpresas() {
  //   this.empresaService.obtenerEmpresas().subscribe((resp) => {
  //     this.empresas = resp; 
  //     console.log('empresas', this.empresas);
  //     this.isLoading = false;

  //   });
  // }
  obtenerEmpresas() {
    this.empresaService.obtenerEmpresas().subscribe((resp) => {
      this.empresas = resp;
  
      this.empresas.sort((a, b) => {
        if (a.estado === 1 && b.estado === 0) {
          return -1; 
        } else if (a.estado === 0 && b.estado === 1) {
          return 1; 
        } else {
          return a.nom_emp.localeCompare(b.nom_emp); 
        }
      });
  
      console.log('empresas', this.empresas);
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

  verEmpresa(empresas: Empresa) {
    this.isVerEmpresaOpen = true;
    // this.isEditarEmpresaOpen = true;
    this.mEmpresa = empresas;
  }

  editarEmpresa(empresas: Empresa) {
    // this.isVerEmpresaOpen = true;
    this.isEditarEmpresaOpen = true;
    this.mEmpresa = empresas;
  }



  eliminarEmpresa(empresas: Empresa) {
    empresas.estado = 0;
   
    this.empresaService.actualizarEmpresa(empresas).subscribe((resp) => {
      console.log('Categoria cambiado a estado inactivo:', resp);
      this.obtenerEmpresas();
    });
  }

  openModal(empresa:Empresa) {
    this.isVerEmpresaOpen = true;
    this.isEditarEmpresaOpen = true;
    this.mEmpresa = empresa;
  }

  closeModal(event: any) {
    console.log(event);
    // this.isModalOpen = event;
    this.isVerEmpresaOpen = event;
    this.isEditarEmpresaOpen = event;
  }

  backToPage() {
    this.navCtrl.navigateBack('home');
  }
  

}
