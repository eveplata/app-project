import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Empresa } from 'src/app/interfaces/empresas.interface';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-ver-empresa',
  templateUrl: './ver-empresa.component.html',
  styleUrls: ['./ver-empresa.component.scss'],
})
export class VerEmpresaComponent  implements OnInit {

  @Input() empresa!:Empresa;
  @Input() isModalOpen!: boolean;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private navCtrl: NavController,
    private empresaService: EmpresasService,
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
    this.isModalOpen = false;
    this.closeModal.emit(this.isModalOpen);
  }

}
