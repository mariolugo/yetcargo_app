import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy,NgZone } from '@angular/core';
import { Auth } from '../providers/auth.service';
import { OrderSrv } from '../providers/order.service';
import { Config } from '../core/config';
import { Order } from '../core/order.interface';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HistoryComponent implements OnInit {
  userId: any;
  socket:any;
  orders: Observable<Order[]>;
  ordersList: any = [];
  temp = [];
  constructor(
    private authSrv: Auth,
    private _zone: NgZone,
    public orderSrv: OrderSrv,
    public config: Config,
    public router: Router,
  ) { 
    let session = JSON.parse(window.localStorage.getItem('session'))
    this.userId = session.id;
  }

  ngOnInit() {
    this.allOrders();
  }

  allOrders(){
    this.orderSrv.getOrders(this.userId);
    this.orders = this.orderSrv.orders;
    this.orderSrv.orders.subscribe(data => {
      this._zone.run(() => {
        // cache our list
        this.temp = [...data];
        this.ordersList = data;
      });
    });
  }

  destinationFilter(event) {
    console.log(event);
    let val = event.target.value;
    // filter our data
    let temp = this.temp.filter(function(d) {
      return d.destination.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.ordersList = temp;
  }

  trackingFilter(event) {
    let val = event.target.value;
    // filter our data
    let temp = this.temp.filter(function(d) {
      return d.tracking.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.ordersList = temp;
  }

  onSelect(selected){
    this.router.navigate(['order/view/', selected]);
  }

}
