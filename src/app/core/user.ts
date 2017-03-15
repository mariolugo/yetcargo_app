export class User{
    id: string;
    firstName: string;
    lastName: string;
    cellphone: string;
    email: string;
    admin: string;
    company: string;
    token: string;
    zip: string;
    address: string;
    activated: string;
    type: string;
    blocked: string;

    constructor()
    constructor(
        id: string,
        firstName: string,
        lastName: string,
        cellphone: string,
        email: string,
        admin: string,
        company: string,
        token: string,
        zip: string,
        address: string,
        activated: string,
        type: string,
        blocked: string
    )
    constructor(
        id?: string,
        firstName?: string,
        lastName?: string,
        cellphone?: string,
        photo?: string,
        email?:string,
        admin?:string,
        company?:string,
        token?: string,
        zip?: string,
        address?: string,
        activated?: string,
        type?: string,
        blocked?: string
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.cellphone = cellphone;
        this.email = email;
        this.company = company;
        this.admin = admin;
        this.token = token;
        this.zip = zip;
        this.address = address;
        this.activated = activated;
        this.type = type;
        this.blocked = blocked;
    }

    getfirstName() {
        return this.firstName;
    }

    isAdmin() {
        return this.admin;
    }

    getEmail() {
        return this.email;
    }

    getToken() {
        return this.token;
    }

    isActivated(){
        return this.activated;
    }

    userType(){
        return this.type;
    }
}