import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { EmpresaUsrEp, UsuarioEmpresas } from 'src/app/interfaces/usuarioEmpresas.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Producto } from 'src/app/interfaces/productos.interface';
import { ProductoSlt, Solicitud } from 'src/app/interfaces/solicitud.interface';


@Component({
  selector: 'app-historial-solicitud',
  templateUrl: './historial-solicitud.page.html',
  styleUrls: ['./historial-solicitud.page.scss'],
})
export class HistorialSolicitudPage implements OnInit {
  id_usr!: string;
  isLoading: boolean = true;
  isModalOpen: boolean = false;
  historial!: Solicitud[]; // aqui almacenamos el historial cuando lo recuperemos de la DB
  mSolicitud!: Solicitud;


  constructor(
    private navCtrl: NavController,
    private usuariosService: UsuariosService,
    private productosService: ProductosService,
    private storage: StorageService,
    private solicitudesService: SolicitudesService
  ) {}

  ngOnInit() {
    //Esta bien todo ya muestras el loader, ese loader tiene que dejar de mostrase cuando obtengas los datos que necesitas
    //en este caso el historial. Como ya tienes un servicio para solicitudes solicitudes.service.ts en ahi se creara una función para recuperar el historial

    //Primero recuperamos el id del usuario logeado del storage
    this.getUID();
  }

  backToPage() {
    this.navCtrl.navigateBack('home');
  }

  getUID() {
    this.storage.getStorageData('uid').subscribe((uid) => {
      console.log('uid', uid);
      this.id_usr = uid; //Asignamos el uid a la variable global para usarlo en cualquier lugar
      //Despues recuperamos el historial de solicitudes
      this.historialPorIdUsuario();
    });
  }

  historialPorIdUsuario() {
    //aqui usamos el servicio y llamamos a la función que recupera el historial
    //[-1, 2, 3] = son los estados que yo le puse en el servicio esta mejor explicado 1 = solitud activa, 2 = aceptada, 3 = entregado, -1 = rechazado
    //en este caso como es historial estoy obteniendo los 2 = aceptada, 3 = entregado, -1 = rechazado que serian su historial
    this.solicitudesService
      .getSolicitudesPorUsuario(this.id_usr, [-1, 0 , 3])
      .subscribe((resp) => {
        console.log('historial', resp); //esto es un salida que se muestra en el navegador cuando recupera los datos
        this.historial = resp; //asignamos la respuesta a la variable historial para mostrarlo en el html
        //console.log('fecha', this.historial[0].fecha_solicitud);
        //console.log('historial', resp[0].fecha_solicitud['seconds']);
        
        this.isLoading = false // aqui colocamos en false para que el loader ya no se muestre por que ya obtuvimos los datos de la DB 
      });
  }

  // esta funcion devolvera en literal enviando el estado numerico
  getValorEstado(estado: number) {
    //1 = solitud activa, 2 = aceptada, 3 = entregado, -1 = rechazado
    const nombresEstados = [
      { id: -1, valor: 'Rechazado' },
      { id: 0, valor: 'En revision' },      
      { id: 1, valor: 'Solicitud Activa' },
      { id: 2, valor: 'Aceptada' },
      { id: 3, valor: 'Entregado' },
    ];
    const obEstado = nombresEstados.find( e => e.id === estado);
    return obEstado != undefined ? obEstado.valor : 'Valor no encontrado'
  }
  openModal(historial:Solicitud) {
    this.isModalOpen = true;
    this.mSolicitud = historial;
  }

  closeModal(event: any) {
    console.log(event);
    this.isModalOpen = event;
  }

  

}
