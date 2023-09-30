import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-solicitar-productos',
  templateUrl: './solicitar-productos.page.html',
  styleUrls: ['./solicitar-productos.page.scss'],
})
export class SolicitarProductosPage implements OnInit {
  constructor(
    private navCtrl: NavController
  ) {
  }

  ngOnInit() {}

  backToPage(){
    this.navCtrl.navigateBack('/home');
  }
}
