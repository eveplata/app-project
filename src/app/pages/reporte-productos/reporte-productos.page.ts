import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ReporteProductosSolicitudes } from 'src/app/interfaces/reporteProductosSolicitudes.interface';
import { Solicitud } from 'src/app/interfaces/solicitud.interface';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-reporte-productos',
  templateUrl: './reporte-productos.page.html',
  styleUrls: ['./reporte-productos.page.scss'],
})
export class ReporteProductosPage implements OnInit {

  isLoading: boolean = true;
  solictudesAceptadas!: Solicitud[];
  reporteProductosSA: ReporteProductosSolicitudes[] = [];

  constructor(
    private navCtrl: NavController,
    private solicitudesService: SolicitudesService
  ) { }

  ngOnInit() {
    this.obtenerSolicitudesAceptadas();
  }

  obtenerSolicitudesAceptadas() {
    this.solicitudesService.getSolicitudesPorEstado([2]).subscribe((sAceptadas) => {
      this.solictudesAceptadas = sAceptadas;
      console.log('this.solictudesAceptadas', this.solictudesAceptadas);
      this.armarReporte();
    });
  }

  backToPage() {
    this.navCtrl.navigateBack('home');
  }

  armarReporte() {
    for(let s of this.solictudesAceptadas) {
      for(let p of s.productos) {
        let productoExiste = this.reporteProductosSA.find(rp => rp.id_producto === p.id_producto);
        if(productoExiste != undefined) {
          let empresaExiste = productoExiste.empresas.find(e => e.id_emp === s.empresa.id_emp);
          console.log(p.id_producto +' -- '+ productoExiste.cantidad +' --- '+ p.cantidad);
          
          productoExiste.cantidad = (productoExiste.cantidad || 0) + (p.cantidad || 0);
          if(empresaExiste === undefined) {
            productoExiste.empresas.push(s.empresa); //forma corta
          }
        } else {
          const preporte: ReporteProductosSolicitudes = { //forma larga
            id_producto: p.id_producto,
            nom_prod: p.nom_prod,
            cont_prod: p.cont_prod,
            marca: p.marca,
            uni_med_prod: p.uni_med_prod,
            cantidad: p.cantidad || 0,
            empresas: [
              {
                id_emp:  s.empresa.id_emp,
                nom_emp: s.empresa.nom_emp
              }
            ]
          };
          this.reporteProductosSA.push(preporte);
        }
      }
    }
    console.log('this.reporteProductosSA', this.reporteProductosSA);
    this.isLoading = false;
  }

}
