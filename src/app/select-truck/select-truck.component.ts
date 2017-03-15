import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../providers/auth.service';
import { Order } from '../core/order.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OrderSrv } from '../providers/order.service';
@Component({
  selector: 'app-select-truck',
  templateUrl: './select-truck.component.html',
  styleUrls: ['./select-truck.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SelectTruckComponent implements OnInit {
  order: Order[];
  truck: any = '';
  private _data = new BehaviorSubject<Order[]>([]);
  constructor(
    private authSrv: Auth,
    private orderSrv: OrderSrv,
    private router: Router
  ) { 
  }
  

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
    
    if (window.localStorage.getItem('currentOrder') === '1') {
      this.orderSrv.setOrderData(JSON.parse(window.localStorage.getItem('order')));
      this.truck = this.orderSrv.getOrderData().truck;
    }
  }

  getUserData(): any {
    return this.authSrv.getUserData();
  }

  goDestination(){
    this.orderSrv.setTruck(this.truck);
    window.localStorage.setItem('currentOrder', '1');
    window.localStorage.setItem('order', JSON.stringify(this.orderSrv.getOrderData()));
    this.router.navigate(['/order/select-destination']);
  }

}
