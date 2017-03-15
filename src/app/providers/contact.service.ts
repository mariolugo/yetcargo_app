import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '../core/http-client';
import { Config } from '../core/config';


@Injectable()
export class Contact {
  private loggedIn = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private config:Config
  ) {
  }

  sendEmail(data) {
    return new Promise((resolve,reject)=>{
      this.http.post(`${this.config.baseUrl}email/`,data)
      .subscribe(res=>{
        resolve(res.json());
      }, err =>{
        reject(err);
      });
    });
  }
}
