import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  correo_usr!: string;

  constructor(
    private loginService: LoginService,
    private usuariosService: UsuariosService

  ) { }

  ngOnInit() {
  }

  restablecer(){

    console.log("Correo " + this.correo_usr);

    this.loginService.sendPasswordResetEmail(this.correo_usr).then((resp) => {
      
      console.log('Recuperar', resp);

    });

  }

}
