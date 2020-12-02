interface addressProps {
    id: number,
    address: string,
    city: string,
    state: string,
    zip: string
}

interface AddressasJSON {
    id: number,
    address: string,
    city: string,
    state: string,
    zip: string
}

export default class Address implements addressProps{
    id: number = 0;
    address: string = "";
    city: string = "";
    state: string = "";
    zip: string = "";
    static singles: Array<Address> = new Array<Address>();


    constructor(id: number = 0, address: string = '', city: string = '', state: string = '', zip:string = '') {
        if (typeof Address.singles[id] === 'undefined') {
            this.id = id;
            this.address = address;
            this.city = city;
            this.state = state;
            this.zip = zip;
        }
        return Address.singles[id];
    }

    toString = () => {
        return JSON.stringify(
            {
                id: this.id,
                address: this.address,
                city: this.city,
                state: this.state,
                zip: this.zip
            }
        );
    }

    fromString = (jsonString: string) => {
        let json = JSON.parse(jsonString) as AddressasJSON;
        this.id = json.id;
        this.address = json.address;
        this.city = json.city;
        this.zip = json.zip;

        return this;
    }

    getID = () => {
        return this.id;
    }

    getAddress = () => {
        return this.address;
    }

    getCity = () => {
        return this.city;
    }

    getState = () => {
        return this.state;
    }

    getZip = () => {
        return this.zip;
    }

    updateAddress = (address:string) => {
        this.address = address
    }

    updateAddressLine2 = (line2:string) => {
        this.address.concat(", " + line2)
    }

    updateCity = (city:string) => {
        this.city = city
    }

    updateState = (state:string) => {
        this.state = state
    }

    updateZip = (zip:string) => {
        this.zip = zip
    }

}