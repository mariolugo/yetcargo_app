import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '../core/http-client';
import { Config } from '../core/config';
import { OrderData } from '../core/order-data';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Order } from '../core/order.interface';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class OrderSrv {
    public orders: Observable<Order[]>;
    private _orders = new BehaviorSubject<Order[]>([]);
    private _ordersObserver: Observer<Order[]>;
    private dataStore: {
        orders: Order[]
    };
    constructor(
        private router: Router,
        private http: HttpClient,
        private config: Config,
        public orderData: OrderData
    ) {
        this.orderData = new OrderData();
        this.dataStore = { orders: [] }
        this._orders = <BehaviorSubject<Order[]>>new BehaviorSubject([]);
        this.orders = this._orders.asObservable();
    }

    getOrderData() {
        return this.orderData;
    }

    setTruck(truck) {
        this.orderData.truck = truck;
    }

    setDestination(destination) {
        this.orderData.destination = destination;
    }

    setLoad(load) {
        this.orderData.load = load;
    }

    setUnload(unload) {
        this.orderData.unload = unload;
    }

    setAdditionals(adds) {
        this.orderData.additionals = adds;
    }

    setComment(comment) {
        this.orderData.comment = comment;
    }

    setExtras(extras) {
        this.orderData.extras = extras;
    }

    setExtrasAddress(extrasAddress) {
        this.orderData.extrasAddress = extrasAddress;
    }

    createOrder(data, id) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.config.baseUrl}order/createOrder/${id}`, data)
                .map(response => response.json())
                .subscribe(data => {
                    this.dataStore.orders = data.orders;
                    this._orders.next(Object.assign({}, this.dataStore).orders);
                    resolve(data);
                }, error => reject(error));
        });
    }

    //get all orders
    getOrders(id) {

        this.http.get(`${this.config.baseUrl}order/allOrders/${id}`)
            .map(response => response.json())
            .subscribe(data => {
                this.dataStore.orders = data.orders;
                this._orders.next(Object.assign({}, this.dataStore).orders);
            }, error => {
                window.location.reload();
            });
    }

    getOrder(id) {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.config.baseUrl}order/findOne/${id}`)
                .map(response => response.json())
                .subscribe(data => {
                    resolve(data);
                    this.setOrderData(data);
                }, error => reject(error));
        });
    }

    setOrderData(session) {
        this.orderData.truck = session.truck;
        this.orderData.user = session.user;
        this.orderData.destination = session.destination;
        this.orderData.load = session.load;
        this.orderData.unload = session.unload;
        this.orderData.status = session.status;
        this.orderData.additionals = session.additionals;
        this.orderData.tracking = session.tracking;
        this.orderData.comment = session.comment;
        this.orderData.createdAt = session.createdAt;
    }

    clearOrderData() {
        this.orderData.truck = undefined;
        this.orderData.user = undefined;
        this.orderData.destination = undefined;
        this.orderData.load = undefined;
        this.orderData.unload = undefined;
        this.orderData.status = undefined;
        this.orderData.additionals = undefined;
        this.orderData.tracking = undefined;
        this.orderData.comment = undefined;
        this.orderData.createdAt = undefined;
    }

}
