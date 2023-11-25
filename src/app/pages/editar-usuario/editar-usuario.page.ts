import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Empresa } from 'src/app/interfaces/empresas.interface';
import { Roles } from 'src/app/interfaces/roles.interface';
import { Solicitud } from 'src/app/interfaces/solicitud.interface';
import { RolesUsr, Usuario } from 'src/app/interfaces/usuario.interface';
import { EmpresaUsrEp, UsuarioEmpresas } from 'src/app/interfaces/usuarioEmpresas.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { RolesService } from 'src/app/services/roles.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  usuario!: Usuario;
  roles!: Roles[];
  empresas!: Empresa[];
  usuarioEmpresas!: UsuarioEmpresas;
  isLoading: boolean = true;
  usuarioRolesId!: string[];
  usuarioEmpresasId!: string[];
  solicitud!: Solicitud[];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private empresasService: EmpresasService,
    private usuarioService: UsuariosService,
    private solicitudesService: SolicitudesService,

  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      //this.refresh = params["refresh"];
      this.usuario = JSON.parse(params["usuario"]);
      console.log('usuario', this.usuario);
      this.rolesUsuarioId();
      console.log('roles usuario', this.usuarioRolesId);

      this.obtenerDatos();
    });
  }

  backToPage() {
    this.navCtrl.navigateBack('gestionar-usuarios');
  }

  obtenerDatos() {
    this.rolesService.obtenerRoles().subscribe((roles) => {
      this.roles = roles;
      console.log('roles', roles);
      this.empresasService.obtenerEmpresas().subscribe((empresas) => {
        this.empresas = empresas;
        console.log('empresas', this.empresas);
        this.usuarioService.getUsuarioEmpresas(this.usuario.id || '').subscribe((resp) => {
          this.usuarioEmpresas = resp[0];
          console.log('usuarioEmpresas', this.usuarioEmpresas);
          this.empresasUsuarioId();
          this.isLoading = false;
        });
      });
    });

  }

  rolesUsuarioId() {
    this.usuarioRolesId = this.usuario.roles.map(r => r.id_rol);
  }

  empresasUsuarioId() {
    this.usuarioEmpresasId = this.usuarioEmpresas.empresas.map(e => e.id_emp);
    console.log('this.usuarioEmpresasId', this.usuarioEmpresasId);
  }

  guardarCambios() {
    /* console.log('roles usuario', this.usuarioRolesId);
    console.log('this.usuarioEmpresasId', this.usuarioEmpresasId); */
    this.actualizarRolesUsuario();
    this.actualizarEmpresasUsuario();
    // this.actualizarUsuarioYsolicitudes();
    this.usuarioService.actualizarUsuario(this.usuario).subscribe((resp) => {
      console.log('Usuario editada:', resp);
      this.empresasService.actualizarUsuarioEmpresa(this.usuarioEmpresas).subscribe((resp) => {
        console.log('Usuario empresas editado:', resp);
        // this.actualizarSolicitudesUsuario();
        this.navCtrl.navigateBack('gestionar-usuarios');
      });
      this.isLoading = false;

    });
  }

  actualizarRolesUsuario() {
    const rolesCompleto: RolesUsr[] = this.usuarioRolesId.map((idString) => {
      // Buscar el objeto correspondiente en el array de objetos
      const objetoEncontrado = this.roles.find((r) => r.id === idString);
      const rol: RolesUsr = {
        id_rol: idString,
        nom_rol: objetoEncontrado?.nom_rol || '',
      };
      return rol;
    });
    this.usuario.roles = rolesCompleto;
    console.log('this.usuario', this.usuario);
  }

  actualizarEmpresasUsuario() {
    const empresasCompleto: EmpresaUsrEp[] = this.usuarioEmpresasId.map((idString) => {
      // Buscar el objeto correspondiente en el array de objetos
      const objetoEncontrado = this.empresas.find((e) => e.id === idString);
      const empresa: EmpresaUsrEp = {
        id_emp: idString,
        nom_emp: objetoEncontrado?.nom_emp || '',
      };
      return empresa;
    });
    this.usuarioEmpresas.empresas = empresasCompleto;
    console.log('this.usuarioEmpresas', this.usuarioEmpresas);
  }

  // actualizarSolicitudesUsuario() {
  //   this.solicitudesService
  //     .getSolicitudesPorUsuario(this.usuario.id || '', [-1, 0, 1, 2, 3])
  //     .subscribe((solicitudes) => {
  //       solicitudes.forEach((solicitud: Solicitud) => {
  //         solicitud.usuario = {
  //           id_usr: this.usuario?.id || '',
  //           nom_usr: this.usuario.nom_usr,
  //           primer_ap: this.usuario.primer_ap,
  //           seg_ap: this.usuario?.seg_ap || '',
  //         };

  //         this.solicitudesService.actualizarSolicitud(solicitud).subscribe((resp) => {
  //           console.log('Solicitud editada:', resp);
  //         });
  //       });

  //       this.isLoading = false;
  //     });
  // }


}
