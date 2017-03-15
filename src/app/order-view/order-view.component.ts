import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { Auth } from '../providers/auth.service';
import { OrderSrv } from '../providers/order.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Config } from '../core/config';
declare var io:any;

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class OrderViewComponent implements OnInit {
  order:any = '';
  additionals:any;
  extrasAddress: any = [];
  socket:any;
  constructor(
     private _zone: NgZone,
    private authSrv: Auth,
    private orderSrv: OrderSrv,
    private route: ActivatedRoute,
    public config: Config
  ) { 
    this.socket = io.sails.connect(this.config.baseUrl);
  }

  ngOnInit() {
    this.getOrderInfo();

    this.socket.on('refreshOrder',(msg) => {
      this._zone.run(() => {
        this.getOrderInfo();
      })
    });
  }

   getUserData():any{
    return this.authSrv.getUserData();
  }

  getOrderInfo(){
    let id = this.route.snapshot.params['id'];
    this.orderSrv.getOrder(id)
    .then(res => {
      this.order = res;
      this.additionals = JSON.parse(this.order.additionals);
      this.extrasAddress = JSON.parse(this.order.extrasAddress);
      console.log(this.order);
    })
    .catch(err=>{
      console.log(err);
    })
  }

}
