import {Injectable} from '@angular/core';
import {Http, Headers,RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpClient {
    token;
    headers;
    options;
    constructor(private http: Http) {
        // this.token = localStorage.getItem('id_token');
        this.token = 'aaa';
        this.headers = new Headers({ 'Authorization': 'JWT ' + this.token });
        this.options = new RequestOptions({ headers: this.headers });
    }

    get(url) {
        return this.http.get(url, {
            headers: this.headers
        });
    }

    post(url, data) {
        return this.http.post(url, data, {
            headers: this.headers
        });
    }

    put(url, data) {
        return this.http.put(url, data, {
            headers: this.headers
        });
    }
}