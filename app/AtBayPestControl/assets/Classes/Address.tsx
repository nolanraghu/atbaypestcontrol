interface addressProps {
    id: string,
    address: string,
    city: string,
    state: string,
    zip: string
}

interface AddressasJSON {
    id: string,
    address: string,
    city: string,
    state: string,
    zip: string
}

export default class Address implements addressProps{
    id: string = "";
    address: string = "";
    city: string = "";
    state: string = "";
    zip: string = "";

    constructor(id: string = "0", address: string = "123 Fake st.",
                city: string = "RealCity", state: string = "Realington", zip: string = "12345") {
        this.id = id;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
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

}