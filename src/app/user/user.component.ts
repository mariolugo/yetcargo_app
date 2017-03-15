import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../providers/auth.service';
import { Config } from '../core/config';
import {OrderSrv} from '../providers/order.service';

declare var io: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UserComponent implements OnInit {
  socket: any;
  constructor(
    private router: Router,
    private authSrv: Auth,
     public config: Config,
     private orderService: OrderSrv,
     private _zone: NgZone
  ) { 
    this.socket = io.sails.connect(this.config.baseUrl);
    let sessionData = JSON.parse(window.localStorage.getItem('session'));
    if(sessionData){
      this.authSrv.getUser()
      .then(res=>{
        this.authSrv.setUserData(res,window.localStorage.getItem('id_token'));
        if( window.localStorage.getItem('currentOrder') === '1'){
          this.orderService.setOrderData(JSON.parse(window.localStorage.getItem('order')));
        }
      })
      .catch(err=>{
        console.log(err);
      });
    }
  }

  ngOnInit() {
    this.socket.on('updateUser', (data) => {
      this._zone.run(() => {
        this.authSrv.getUser()
          .then(res => {
            this.authSrv.setUserData(res, window.localStorage.getItem('id_token'));
            if (window.localStorage.getItem('currentOrder') === '1') {
              this.orderService.setOrderData(JSON.parse(window.localStorage.getItem('order')));
            }
          })
          .catch(err => {
            console.log(err);
          });
      })

    })
  }

  createOrder(){
    this.router.navigate(['/order/select-truck']);
  }

  getUserData():any{
    return this.authSrv.getUserData();
  }

}
