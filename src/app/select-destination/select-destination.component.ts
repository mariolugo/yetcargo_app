import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {ClientSrv} from '../providers/clients.service';
import { Observable } from 'rxjs/Observable';
import { Client } from '../core/client.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Auth } from '../providers/auth.service';
import { OrderSrv } from '../providers/order.service';
@Component({
  selector: 'app-select-destination',
  templateUrl: './select-destination.component.html',
  styleUrls: ['./select-destination.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SelectDestinationComponent implements OnInit {
  favoriteSeason: string;
  clientAddress:any = '';
  clients: Observable<Client[]>;
  clientsList: any = [];
  temp = [];
  constructor(
    private authSrv: Auth,
    private orderSrv: OrderSrv,
    private router: Router,
    private clientSrv: ClientSrv,
    private _zone: NgZone
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
      this.clientAddress = this.orderSrv.getOrderData().destination;
    }
    let session = JSON.parse(window.localStorage.getItem('session'));

    this.clientSrv.getClients(session.id);
    this.clients = this.clientSrv.clients;
    this.clientSrv.clients.subscribe(data => {
      this._zone.run(()=> {
        this.temp = [...data];
        this.clientsList = data;
      });
    })
  }

  destinationFilter(event) {
    let val = event.target.value;
    // filter our data
    let temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.clientsList = temp;
  }

  getUserData():any{
    return this.authSrv.getUserData();
  }

  setProperty(address){
    console.log(address);
    this.clientAddress = address;
  }

  goDates(){
    this.orderSrv.setDestination(this.clientAddress);
    window.localStorage.setItem('order', JSON.stringify(this.orderSrv.getOrderData()));
    this.router.navigate(['/order/select-dates']);
  }

}
