import { Component } from '@angular/core';
import {Auth} from './providers/auth.service';
// import {OrderSrv} from './providers/order.service';
import { Config } from './core/config';
declare var window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(
    // private authService: Auth,
    // private orderService: OrderSrv,
    // public config: Config
  ){
    //get session and order
    // let sessionData = JSON.parse(window.localStorage.getItem('session'));
    // if(sessionData){
    //   this.authService.getUser()
    //   .then(res=>{
    //     this.authService.setUserData(res,window.localStorage.getItem('id_token'));
    //     // if( window.localStorage.getItem('currentOrder') === '1'){
    //     //   this.orderService.setOrderData(JSON.parse(window.localStorage.getItem('order')));
    //     // }
    //   })
    //   .catch(err=>{
    //     console.log(err);
    //   });
    // }
  }
}
