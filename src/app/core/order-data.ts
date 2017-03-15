import { Order } from './order.interface';

export class OrderData extends Order{
    token: string;
    constructor() {
        super();
    }
}

