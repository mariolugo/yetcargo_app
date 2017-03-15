import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { OrderSrv } from '../providers/order.service';
import { Observable } from 'rxjs/Observable';
import { Order } from '../core/order.interface';
import { Config } from '../core/config';
import { Auth } from '../providers/auth.service';

declare var io: any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class OrdersComponent implements OnInit {
  private style: string;
  userId: any;
  socket: any;
  orders: Observable<Order[]>;
  ordersList: any = [];
  temp = [];
  constructor(
    private _zone: NgZone,
    private router: Router,
    private authSrv: Auth,
    public orderSrv: OrderSrv,
    public config: Config
  ) { 
    let session = JSON.parse(window.localStorage.getItem('session'))
    this.userId = session.id;
     this.socket = io.sails.connect(this.config.baseUrl);
  }

  ngOnInit() {
    this.getOrders();

    this.socket.on('refreshOrders', (msg) => {
      this.getOrders();
    });

    this.socket.on('updateUser', (data) => {
      this._zone.run(() => {
        this.authSrv.getUser()
          .then(res => {
            this.authSrv.setUserData(res, window.localStorage.getItem('id_token'));
            if (window.localStorage.getItem('currentOrder') === '1') {
              this.orderSrv.setOrderData(JSON.parse(window.localStorage.getItem('order')));
            }
          })
          .catch(err => {
            console.log(err);
          });
      })

    })
  }

  goToOrder(id){
    this.router.navigate([`/order/view/${id}`]);
  }

  getUserData(): any {
    return this.authSrv.getUserData();
  }

  getOrders() {
    this.orderSrv.getOrders(this.userId);
    this.orders = this.orderSrv.orders;
    this.orderSrv.orders.subscribe(data => {
      this._zone.run(() => {
        this.temp = [...data.filter((el) => {
          return el.status !== 'Finalizada';
        })];
        this.ordersList = data.filter((el) => {
          return el.status !== 'Finalizada';
        });
      });
    });
  }

}
