interface addressProps {
    id: number,
    address: string,
    address2: string,
    city: string,
    state: string,
    zip: string
}

interface AddressasJSON {
    id: number,
    address: string,
    address2: string,
    city: string,
    state: string,
    zip: string
}

export default class Address implements addressProps{
    id: number = 0;
    address: string = "";
    address2: string = "";
    city: string = "";
    state: string = "";
    zip: string = "";

    constructor(id: number = 0, address: string = '', address2: string = '', city: string = '', state: string = '', zip:string = '') {
            this.id = id;
            this.address = address;
            this.address2 = address2;
            this.city = city;
            this.state = state;
            this.zip = zip;
    }

    toString = () => {
        return JSON.stringify(
            {
                id: this.id,
                address: this.address,
                address2: this.address2,
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
        this.address2 = json.address2;
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

    getAddress2 = () => {
        return this.address2;
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
        this.address2 = line2;
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
