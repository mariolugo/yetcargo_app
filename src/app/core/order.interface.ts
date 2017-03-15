export class Order{
    truck: string;
    user: string;
    destination: string;
    load: string;
    unload: string;
    tracking: string;
    additionals: any;
    status: string;
    comment: string;
    createdAt: string;
    extras: string;
    extrasAddress: any;
    worker:any;
    constructor()
    constructor(
        truck: string,
        user: string,
        destination: string,
        load: string,
        unload: string,
        tracking: string,
        status: string,
        comment: string,
        createdAt: string,
        additionals: any,
        extras: any,
        extrasAddress: any,
        worker:any
    )
    constructor(
        truck?: string,
        user?: string,
        destination?: string,
        load?: string,
        photo?: string,
        unload?:string,
        tracking?:string,
        status?:string,
        comment?: string,
        createdAt?: string,
        additionals?: any,
        extras?: any,
        extrasAddress?: any,
        worker?: any
    ) {
        this.truck = truck;
        this.user = user;
        this.destination = destination;
        this.load = load;
        this.unload = unload;
        this.status = status;
        this.tracking = tracking;
        this.comment = comment;
        this.createdAt = createdAt;
        this.additionals = additionals;
        this.extras = extras;
        this.extrasAddress = extrasAddress;
        this.worker = worker;
    }
}