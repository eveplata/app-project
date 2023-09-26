import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private loginService: LoginService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    /*this.loginService.getUserAuth().subscribe(
      (user) => {
        console.log('get user home', user);
      }
    );*/
    this.loginService.getUserAuth().subscribe(resp => {
      console.log(resp);      
    });
    
  }

  salir() {
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
}
