import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ReclamosService } from 'src/app/services/reclamos.service';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.page.html',
  styleUrls: ['./reclamos.page.scss'],
})
export class ReclamosPage implements OnInit {
  reclamos: any[] = [];

  constructor(
    private navCtrl: NavController,
    private reclamosService: ReclamosService,

  ) { }

  ngOnInit() {
    this.obtenerCategorias();
  }
  obtenerCategorias() {
    this.reclamosService.getObetenerReclamos().subscribe((resp) => {
      this.reclamos = resp;
    });
  }
  

  backToPage() {
    this.navCtrl.navigateForward('home');
  }

}
