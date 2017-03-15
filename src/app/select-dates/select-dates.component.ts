import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { Router } from '@angular/router';
import { Auth } from '../providers/auth.service';
import { Config } from '../core/config';
import {OrderSrv} from '../providers/order.service';
@Component({
  selector: 'app-select-dates',
  templateUrl: './select-dates.component.html',
  styleUrls: ['./select-dates.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SelectDatesComponent implements OnInit {
  public dt: Date = new Date();
  public dt2: Date = new Date();
  public mytime: Date = new Date();
  constructor(
    private _zone: NgZone,
     private router: Router,
    private authSrv: Auth,
     public config: Config,
     private orderService: OrderSrv,
     private orderSrv: OrderSrv,
  ) { }

  ngOnInit() {
    let sessionData = JSON.parse(window.localStorage.getItem('session'));
    if(sessionData){
      this.authSrv.getUser()
      .then(res=>{
        this.authSrv.setUserData(res,window.localStorage.getItem('id_token'));
        if( window.localStorage.getItem('currentOrder') === '1'){
          this.orderSrv.setOrderData(JSON.parse(window.localStorage.getItem('order')));
        }
      })
      .catch(err=>{
        console.log(err);
      });
    }

    this.dt2.setDate(this.dt.getDate() + 7);
  }

  selectDate(dt) {
    this._zone.run(() => {
      this.dt = dt; 
      console.log('dt',dt);
      console.log('this.dt', this.dt);
    });

  }

  goExtras(){
    this.dt.setHours(this.mytime.getHours());
    this.dt.setMinutes(this.mytime.getMinutes());
    this.orderSrv.setLoad(this.dt);
    window.localStorage.setItem('order', JSON.stringify(this.orderSrv.getOrderData()));
    console.log('finaldt',this.dt);
    this.router.navigate(['/order/select-additionals']);
  }

}
