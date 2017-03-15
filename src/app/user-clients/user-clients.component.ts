import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Client } from '../core/client.interface';
import { ClientSrv } from '../providers/clients.service'; import { Auth } from '../providers/auth.service';
@Component({
  selector: 'app-user-clients',
  templateUrl: './user-clients.component.html',
  styleUrls: ['./user-clients.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class UserClientsComponent implements OnInit {
  total: any;
  clients: Observable<Client[]>;
  clientsList: any = [];
  constructor(
    private authSrv: Auth,
    private clientSrv: ClientSrv,
    private _zone: NgZone
  ) { }

  ngOnInit() {
    let session = JSON.parse(window.localStorage.getItem('session'));
    this.clientSrv.getUserCount(session.id)
    .then(res=>{
      let response:any = res;
      this.total = response.total;
    })
    .catch(err=>{
    })
    this.clientSrv.getClients(session.id);
    this.clients = this.clientSrv.clients;
    this.clientSrv.clients.subscribe(data => {
      this._zone.run(()=> this.clientsList = data);
    });
  }

  getUserData():any{
    return this.authSrv.getUserData();
  }

}
