export class Client{
    name: string;
    address: string;
    constructor()
    constructor(
        name: string,
        address: string,
    )
    constructor(
        name?: string,
        address?: string
    ) {
        this.name = name;
        this.address = address;
    }
}