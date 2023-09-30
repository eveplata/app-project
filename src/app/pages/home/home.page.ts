import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { from } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loading: boolean = true;
  uid!: string;

  constructor(
    private loginService: LoginService,
    private navCtrl: NavController,
    private storage: StorageService
  ) {}

  ngOnInit() {
    /*this.loginService.getUserAuth().subscribe(
      (user) => {
        console.log('get user home', user);
      }
    );*/
    this.storage.getStorageData('uid').subscribe((resp) => {
      console.log('uid', resp);
      
      this.loading = false;
      this.uid = resp;
    });
    /*this.loginService.getUserAuth().subscribe((resp) => {
      console.log('AUTH', resp);
    });*/
  }

  cerrarSession() {
    console.log('clic');
    this.loginService
      .logout()
      .then((resp) => {
        console.log(resp);
        this.navCtrl.navigateRoot('login');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  solicitar() {}
}
