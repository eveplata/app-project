import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Reclamos } from 'src/app/interfaces/reclamos.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { EmpresaUsrEp, UsuarioEmpresas } from 'src/app/interfaces/usuarioEmpresas.interface';
import { ReclamosService } from 'src/app/services/reclamos.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-reclamo-usuario',
  templateUrl: './reclamo-usuario.page.html',
  styleUrls: ['./reclamo-usuario.page.scss'],
})
export class ReclamoUsuarioPage implements OnInit {
  id_usr!: string;
  usuarioEmpresas!: UsuarioEmpresas;
  empresaSeleccionada!: EmpresaUsrEp;
  usuario!: Usuario;
  isLoading: boolean = true;
  nombreCompleto!: string;
  reclamo: any = {};
  // formReclamo: FormGroup;

  constructor(
    private navCtrl: NavController,
    private usuariosService: UsuariosService,
    private storage: StorageService,
    private reclamosService: ReclamosService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,

  ) {
    // this.formReclamo = this.formBuilder.group({
    //   nombre: ['', Validators.required],
    //   empresa: [''],
    // });
  }

  ngOnInit() {
    this.getUID();
  }

  getUID() {
    this.storage.getStorageData('uid').subscribe((uid) => {
      console.log('uid', uid);
      this.id_usr = uid;
      this.usuarioEmpresasPorId(this.id_usr);
    });
  }

  usuarioEmpresasPorId(uid: string) {
    this.usuariosService.getUsuarioEmpresas(uid).subscribe((resp) => {
      this.usuarioEmpresas = resp[0];
      console.log('usuarioEmpresas', this.usuarioEmpresas);
      this.usuarioPorId();
    });
  }

  usuarioPorId() {
    this.usuariosService.getUsuarioPorId(this.id_usr).subscribe((resp) => {
      this.isLoading = false;
      this.usuario = resp;
      console.log('usuario', this.usuario);

      this.nombreCompleto = `${this.usuario.nom_usr} ${this.usuario.primer_ap} ${this.usuario.seg_ap}`;


    });
  }
  handleChange(e: any) {
    console.log('handleChange activado');
    this.empresaSeleccionada = e.detail.value;
    console.log('empresaSeleccionada', this.empresaSeleccionada);
  }
  handleCancel() {
    console.log('ionCancel fired');
  }

  handleDismiss() {
    console.log('ionDismiss fired');
  }

  // enviarReclamo() {

  //   this.reclamosService.getReclamosPorUsuario(this.id_usr).subscribe((resp) => {
  //     console.log('reclamos', resp);

  //   });

  // }

  enviarReclamo() {
    const reclamo: Reclamos = {
      id: '', 
      id_usr: this.id_usr,
      nom_usr: this.usuario.nom_usr,
      primer_ap: this.usuario.primer_ap,
      seg_ap: this.usuario.seg_ap || '',
      id_emp: this.empresaSeleccionada?.id_emp || '', 
      nom_emp: this.empresaSeleccionada?.nom_emp || '', 
      fecha: new Date(), 
      descripcion: this.reclamo.descripcion, 
      asunto: this.reclamo.asunto 
    };
  
    this.reclamosService.crearReclamo(reclamo).subscribe((resp) => {
      console.log('Reclamo enviado', resp);
      this.mostrarAlerta();
    });
  }
  
  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Reclamo enviado',
      message: 'Tu reclamo ha sido enviado correctamente.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.navigateBack('home');
        }
      }]
    });
  
    await alert.present();
  }
  
  


  backToPage() {
    this.navCtrl.navigateBack('home');
  }


}
