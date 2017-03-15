import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '../core/http-client';
import { Config } from '../core/config';
import { UserData } from '../core/user-data';
import { prebootComplete } from "angular2-universal";
import { CookieService } from 'angular2-cookie/services/cookies.service';
@Injectable()
export class Auth {
    private loggedIn = false;
    constructor(
        private router: Router,
        private http: HttpClient,
        private config: Config,
        public userData: UserData,
        public cookieSrv: CookieService
    ) {
        this.userData = new UserData();
    }

      login(credentials) {
        return new Promise((resolve,reject)=>{
          this.http.post(`${this.config.baseUrl}auth/signin`,credentials)
          .subscribe(res=>{
              
            if(res.json().token){
                // this.cookieSrv.put('id_token',res.json().token);
                // this.cookieSrv.put('session',JSON.stringify(res.json().user));
            window.localStorage.setItem('id_token',res.json().token);
            //   this.storageSrv.setItem('id_token',res.json().token)
            //   this.storageSrv.setItem('session',JSON.stringify(res.json().user));
            window.localStorage.setItem('session',JSON.stringify(res.json().user));
            this.setUserData(res.json().user,res.json().token);
            }
            resolve(res.json());
             prebootComplete();
          }, err =>{
            reject(err);
          });
        });
      }

    test() {
        return new Promise((resolve, reject) => {
            this.http
                .get(`${this.config.baseUrl}user/`)
                .subscribe(data => {
                    console.log(data);
                    resolve(data.json())
                }, err =>{
                    reject(err);
                });
        })
    }

      signUp(credentials){
        return new Promise((resolve,reject)=>{
          this.http.post(`${this.config.baseUrl}auth/signup`,credentials)
          .subscribe(res=>{
              window.localStorage.setItem('id_token',res.json().token);
              window.localStorage.setItem('session',JSON.stringify(res.json().user));
            this.setUserData(res.json().user,res.json().token);
            resolve(res.json());
             prebootComplete();
          }, err =>{
            reject(err);
          })
        })
      }

     sendAgain(id){
       return new Promise((resolve,reject)=>{
         this.http.get(`${this.config.baseUrl}auth/sendAgain/${id}`)
         .subscribe(res=>{
           resolve(res.json());
            prebootComplete();
         }, err =>{
           reject(err);
         })
       })
     }

      getUser(){
        return new Promise((resolve,reject)=>{
          let session = JSON.parse(window.localStorage.getItem('session'));
          let id = session.id;
          this.http.get(`${this.config.baseUrl}user/${id}`)
          .subscribe(res=>{
            resolve(res.json());
             prebootComplete();
          }, err =>{
            reject(err);
          })
        })
      }

      getUserProfile(id){
        return new Promise((resolve,reject)=>{
          this.http.get(`${this.config.baseUrl}user/getUserProfile/${id}`)
          .subscribe(res=>{
            resolve(res.json());
             prebootComplete();
          }, err =>{
            reject(err);
          });
        });
      }

    getUserData() {
      return this.userData;
    }

    setUserData(session,token) {
      this.userData.id = session.id;
      this.userData.firstName = session.firstName;
      this.userData.lastName = session.lastName;
      this.userData.cellphone = session.cellPhone;
      this.userData.company = session.company;
      this.userData.email = session.email;
      this.userData.admin = session.admin;
      this.userData.type = session.type;
      this.userData.zip = session.zip;
      this.userData.address = session.address;
      this.userData.token = token;
      this.userData.activated = session.activated;
      this.userData.blocked = session.blocked;
    }

      logout() {
        //To log out, just remove the token and profile
        //from local storage
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');

        //Send the user back to the dashboard after logout
        this.router.navigateByUrl('/');
      }

      isLoggedIn(){
        return window.localStorage.getItem('id_token');
      }
}
