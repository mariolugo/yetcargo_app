import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../core/config';
import { Auth } from '../providers/auth.service';
import { OrderSrv } from '../providers/order.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class ReviewComponent implements OnInit {
  additionals:any = [];
  extrasAddress: any = [];
  constructor(
     private authSrv: Auth,
    private orderSrv: OrderSrv,
    private router: Router,
    public config: Config
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
    
    
    let order = JSON.parse(window.localStorage.getItem('order'));
    console.log('order',order);
    if (order.additionals){
      this.additionals = JSON.parse(order.additionals);
    }
    if (order.extrasAddress){
      this.extrasAddress = JSON.parse(order.extrasAddress);
      console.log('extrasAddress',this.extrasAddress);
    }
  }

   getOrderData():any{
    return this.orderSrv.getOrderData();
  }

   getUserData():any{
    return this.authSrv.getUserData();
  }

  createOrder(){
    this.orderSrv.createOrder(this.getOrderData(),this.getUserData().id)
    .then(res=>{
      this.orderSrv.clearOrderData();
      // this.snackBar.open('Orden creada','CERRAR',{
      //   duration: 3000
      // });
      window.localStorage.setItem('order','');
      window.localStorage.setItem('currentOrder','0');
      // this.socket.get('/order/realTimeOrders',(resData, jwres)=>{
      //   console.log(resData);
      // });
      this.router.navigate(['/user']);
      console.log(res);
      
    })
    .catch(err=>{
      console.log(err);
    });
  }


}
