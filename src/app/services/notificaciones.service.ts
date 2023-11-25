import { Injectable } from '@angular/core';

// import {
//   ActionPerformed,
//   PushNotificationSchema,
//   PushNotifications,
//   Token,
// } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor() { }
  
  
//   inicializar() {

//     if (this.platform.is('capacitor')) {

//          PushNotifications.requestPermission().then( result => {
//              console.log('PushNotifications.requestPermission()');
//              if (result.granted) {
//                console.log('permisos concedidos');
//                // Register with Apple / Google to receive push via APNS/FCM
//                PushNotifications.register();
//                this.addListeners();
//              } else {
//                // Show some error
//              }
//          });
         
//     } else {
//       console.log('PushNotifications.requestPermission() -> no es movil');
//     }
//  }
}
