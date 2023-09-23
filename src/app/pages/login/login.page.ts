import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
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
  errormsg!: String;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private navCtrl: NavController,
    private storage: StorageService
  ) {
    this.formLogin = this.formBuilder.group({
      email: [
        'admin@admin.com',
        [
          Validators.required,
          //Validators.pattern('[a-z0-9.S]+'),
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      password: ['admin*123', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {}

  login() {
    console.log(this.formLogin.value);
    const { email, password } = this.formLogin.value;
    this.loginService
      .loginWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log(resp);
        if (resp.user) {
          this.navCtrl.navigateRoot('home');
        }
      })
      .catch((err) => {
        console.log(err);        
      });
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

  getEmailMessage() {
    if (this.formLogin.controls['email'].hasError('required')) {
      return 'Este campo es requerido';
    }
    /*if (this.formLogin.controls['email'].hasError('pattern')) {
      return 'Valor de campo invalido (Ej. "juanito.perez" o "vflores")';
    }*/
    if (
      this.formLogin.controls['email'].hasError('maxLength') != null ||
      this.formLogin.controls['email'].hasError('minLength') != null
    ) {
      return 'Mínimo 4 caracteres, máximo 30 caracteres';
    }
    return;
  }

  getPasswordMessage() {
    if (this.formLogin.controls['password'].hasError('required')) {
      return 'Este campo es requerido';
    }
    if (this.formLogin.controls['password'].hasError('minLength') != null) {
      return 'Mínimo 4 caracteres';
    }
    return;
  }
}
