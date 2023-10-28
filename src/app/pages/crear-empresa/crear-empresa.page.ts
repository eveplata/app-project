import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Empresa } from 'src/app/interfaces/empresas.interface';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.page.html',
  styleUrls: ['./crear-empresa.page.scss'],
})
export class CrearEmpresaPage implements OnInit {

  empresa: Empresa = {
    nom_emp: '',
    dir_emp: '',
    fec_inicio:  { seconds: 0, nanoseconds: 0 },
    //fec_fin:  { seconds: 0, nanoseconds: 0 },
    tipo_emp: '',
    estado: 1,
    telefono: 0, 
    celu_emp: 0,
    email_emp: '',
    dep_emp: '',
    //id: ''
  };
  

  agregarEmpresa: boolean = false;


  
  constructor(
    private navCtrl: NavController,
    private empresasService: EmpresasService,
  ) { }


  ngOnInit() {
  }

  crearEmpresa() {

    console.log('this.empresa', this.empresa);    

    if (this.agregarEmpresa) {
      return; 
    }

    this.agregarEmpresa = true;    
  
      this.empresasService.crearEmpresa(this.empresa).subscribe(
        (docRef) => {
          console.log('Empresa creada:', docRef.id);
          this.agregarEmpresa = false; 
  
          this.navCtrl.navigateBack('/lista-empresas');
        },
        (error) => {
          console.error('Error al crear la empresa:', error);
          this.agregarEmpresa = false; 
        }
      );
    
  }
  
 backToPage(){
    this.navCtrl.navigateBack('home');
  }

}
