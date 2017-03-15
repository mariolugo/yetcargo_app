import { Component, OnInit,OpaqueToken } from '@angular/core';
import { Auth } from '../providers/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../core/storage.service';
import { ServerStorage } from '../core/storage.node';
@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.css']
})
export class PublicHeaderComponent implements OnInit {
  session = '';
  constructor(
    private authSrv: Auth,
     private router: Router,
     private storageSrv: StorageService
  ) { }

  ngOnInit() {
    //let session = JSON.parse(localStorage.getItem('session'))
    // console.log(session);
    console.log(this.storageSrv.getItem('id_token'));
  }



  // getUserData(): any {
  //   return this.authSrv.getUserData();
  // }



  logout() {
    window.localStorage.clear();
    this.router.navigate(['/']);
  }

}
