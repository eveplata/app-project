import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timestamp } from 'rxjs';
import { Empresa } from 'src/app/interfaces/empresas.interface';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.scss'],
})
export class EditarEmpresaComponent  implements OnInit {
  @Input() empresa!:Empresa;  
  @Input() isEditarEmpresaOpen!: boolean;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private empresasService: EmpresasService,
  ) { 
    
  }

  ngOnInit() {

  }

  getValorEstado(estado: number) {
    const nombresEstados = [
      { id: 0, valor: 'Inactivo' },
      { id: 1, valor: 'Activo' },
    ];
    const obEstado = nombresEstados.find((e) => e.id === estado);
    return obEstado !== undefined ? obEstado.valor : 'Valor no encontrado';
  }

  guardarCambios() {
    this.empresasService.actualizarEmpresa(this.empresa).subscribe((resp) => {
      console.log('Empresa editada:', resp);
      this.isEditarEmpresaOpen = false;
      this.closeModal.emit(this.isEditarEmpresaOpen);
    });
  }
  cancel() {
    this.isEditarEmpresaOpen = false;
    this.closeModal.emit(this.isEditarEmpresaOpen);
  }

  backToPage() {
    this.isEditarEmpresaOpen = false;
    this.closeModal.emit(this.isEditarEmpresaOpen);
  }
}