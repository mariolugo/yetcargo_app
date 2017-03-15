import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '../core/http-client';
import { Config } from '../core/config';
import { Client } from '../core/client.interface';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { prebootComplete } from "angular2-universal";
@Injectable()
export class ClientSrv {
    public clients: Observable<Client[]>;
    private _clients = new BehaviorSubject<Client[]>([]);
    private _clientsObserver: Observer<Client[]>;
    private dataStore: {
        clients: Client[]
    };
    constructor(
        private router: Router,
        private http: HttpClient,
        private config: Config
    ) {
        this.dataStore = { clients: [] }
        this._clients = <BehaviorSubject<Client[]>>new BehaviorSubject([]);
        this.clients = this._clients.asObservable();
    }

    createClient(data, id) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.config.baseUrl}client/addClient/${id}`, data)
                .map(response => response.json())
                .subscribe(data => {
                    console.log('res', data);
                    let clientes = data;
                    this.dataStore.clients = clientes;
                    this._clients.next(Object.assign({}, this.dataStore).clients);
                    resolve(data);
                    prebootComplete();
                }, err => {
                    reject(err);
                });
        });
    }

    //get all orders
    getClients(id) {
        console.log('id', id);
        this.http.get(`${this.config.baseUrl}client/allClients/${id}`)
            .map(response => response.json())
            .subscribe(data => {
                console.log('data', data);
                this.dataStore.clients = data.clients;
                this._clients.next(Object.assign({}, this.dataStore).clients);
                prebootComplete();
            }, error => {
                window.location.reload();
                console.log('Could not load clients.')
            });
    }

    getUserCount(id) {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.config.baseUrl}user/getUserOrderCount/${id}`)
                .subscribe(res => {
                    resolve(res.json());
                    prebootComplete();
                }, err => {
                    reject(err);
                });
        });
    }
}
