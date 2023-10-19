import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { StorageService } from 'src/app/services/storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Timestamp } from 'firebase/firestore';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  id_usr!: string;
  usuario!: Usuario;
  isLoading: boolean = true;


  constructor(
    private navCtrl: NavController,
    private storage: StorageService,
    private usuariosService: UsuariosService,
  ) {}

  ngOnInit() {
    this.getUID();
    
  }

  getUID() {
    this.storage.getStorageData('uid').subscribe((uid) => {
      console.log('uid', uid);
      this.id_usr = uid;
      this.usuarioPorId();

    });
  }


  usuarioPorId() {
    this.usuariosService.getUsuarioPorId(this.id_usr).subscribe((resp) => {
      this.isLoading = false;
      this.usuario = resp;
      console.log('usuario', this.usuario);
    });
  }

  formatTimestamp(timestamp: any): string {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return date.toLocaleDateString('es-ES', options);
    }
    return 'Fecha no disponible';
  }

  backToPage() {
    this.navCtrl.navigateForward('home');
  }

}
