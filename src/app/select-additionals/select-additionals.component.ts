import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { OrderSrv } from '../providers/order.service';
import { Auth } from '../providers/auth.service';
@Component({
  selector: 'app-select-additionals',
  templateUrl: './select-additionals.component.html',
  styleUrls: ['./select-additionals.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class SelectAdditionalsComponent implements OnInit {
  extrasAddress:'';
  options:Array<any> = [
    {name:'Maniobra de carga', value:'1', checked:false},
    {name:'Maniobra de descarga', value:'2', checked:false},
    {name:'Estadías', value:'3', checked:false},
    {name:'Casetas', value:'4', checked:false}
  ];
  extras = [
    'Reparto',
    'Recolección',
  ];
  extraValue:any;
  comments:any = '';
  constructor(
    private authSrv: Auth,
    private orderSrv: OrderSrv,
    private router: Router
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

    if (window.localStorage.getItem('currentOrder') === '1') {
      this.orderSrv.setOrderData(JSON.parse(window.localStorage.getItem('order')));
      console.log(this.orderSrv.getOrderData());
      if(this.orderSrv.getOrderData().comment !== undefined ){
        this.comments = this.orderSrv.getOrderData().comment;
      }
      if(this.orderSrv.getOrderData().additionals !== undefined){
        let values = JSON.parse(this.orderSrv.getOrderData().additionals);
        for(let option of this.options){
          for(const value of values){
            if(option.name === value){
              option.checked = true;
            }
          }
        }
      }
      if(this.orderSrv.getOrderData().extras !== undefined){
        this.extraValue = this.orderSrv.getOrderData().extras;
      }
      if(this.orderSrv.getOrderData().extrasAddress !== undefined){
        this.extrasAddress = JSON.parse(this.orderSrv.getOrderData().extrasAddress);
      }
    }
  }

  selectedOptions() { 
    return this.options
              .filter(opt => opt.checked)
              .map(opt => opt.name)
  }

  goReview(){
    this.orderSrv.setAdditionals(JSON.stringify(this.selectedOptions()));
    this.orderSrv.setComment(this.comments);
    this.orderSrv.setExtras(this.extraValue);
    this.orderSrv.setExtrasAddress(JSON.stringify(this.extrasAddress));
    console.log(this.orderSrv.getOrderData());
    window.localStorage.setItem('order', JSON.stringify(this.orderSrv.getOrderData()));
    this.router.navigate(['/order/review']);
  }

}
