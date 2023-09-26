import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('passwordEyeLogin', { read: ElementRef }) passwordEye!: ElementRef;
  passwordTypeInput = 'password';
  formLogin: FormGroup;
  errorMsg: String = '';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private storage: StorageService
  ) {
    this.formLogin = this.formBuilder.group({
      email: [
        'admin@admin.com',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
          Validators.maxLength(30),
        ],
      ],
      password: ['admin*123', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {
  }

  async login() {
    console.log(this.formLogin.value);
    const { email, password } = this.formLogin.value;
    const loading = await this.showLoading();
    this.loginService
      .loginWithEmailAndPassword(email, password)
      .then((resp) => {
        loading.dismiss();
        console.log(resp);
        if (resp.user) {
          this.navCtrl.navigateRoot('home');
        }
      })
      .catch((err) => {
        if (err.code.includes('auth/network')) {
          this.errorMsg = 'Verifique su conexión';
        }
        if (err.code.includes('auth/invalid')) {
          this.errorMsg = 'No se pudo iniciar sesión';
        }
        loading.dismiss();
        console.log('err', err.code);
        console.log('err', err.message);
      });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Espere por favor...',
      keyboardClose: true,
    });

    loading.present();
    return loading;
  }

  togglePasswordMode() {
    this.passwordTypeInput =
      this.passwordTypeInput === 'text' ? 'password' : 'text';
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    const inputSelection = nativeEl.selectionStart;
    nativeEl.focus();
    setTimeout(() => {
      nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);
  }

  validation_messages = {
    email: [
      { type: 'required', message: 'El email es requerido.' },
      { type: 'pattern', message: 'Por favor ingrese un email válido' },
      {
        type: 'maxlength',
        message: 'Mínimo 4 caracteres, máximo 30 caracteres',
      },
    ],
    password: [
      { type: 'required', message: 'El password es requerido.' },
      {
        type: 'minlength',
        message: 'El password debe tener al menos 4 caracteres',
      },
    ],
  };
}
