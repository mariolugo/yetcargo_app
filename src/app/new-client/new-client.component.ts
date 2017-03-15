import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Client } from '../core/client.interface';
import { Observable } from 'rxjs/Observable';
import {Auth} from '../providers/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {ClientSrv} from '../providers/clients.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class NewClientComponent implements OnInit {
  public createClient: FormGroup;
  constructor(
    private formB: FormBuilder,
    private clientSrv: ClientSrv,
    private authSrv: Auth,
  ) { 
    this.createClient = formB.group({
      'name': [null, Validators.compose([Validators.required, Validators.nullValidator])],
      'address': [null, Validators.compose([Validators.required, Validators.nullValidator])],
    });
  }

  ngOnInit() {
  }

  getUserData():any{
    return this.authSrv.getUserData();
  }

  addClient(data,valid){
    console.log('aaa');
    this.clientSrv.createClient(data, this.getUserData().id)
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })
  }

}
