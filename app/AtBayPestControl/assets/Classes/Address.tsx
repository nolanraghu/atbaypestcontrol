interface addressProps {
    address: string,
    address2: string,
    city: string,
    state: string,
    zip: string
}

interface AddressasJSON {
    address: string,
    address2: string,
    city: string,
    state: string,
    zip: string
}

export default class Address implements addressProps{
    address: string = "";
    address2: string = "";
    city: string = "";
    state: string = "";
    zip: string = "";

    constructor(address: string = '', address2: string = '', city: string = '', state: string = '', zip:string = '') {
            this.address = address;
            this.address2 = address2;
            this.city = city;
            this.state = state;
            this.zip = zip;
    }

    toString = () => {
        return JSON.stringify(
            {
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
        this.address = json.address;
        this.address2 = json.address2;
        this.city = json.city;
        this.state = json.state;
        this.zip = json.zip;

        return this;
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

    getReadable = () => {
        let address = this.address;
        if (this.address2 != '') {
            address = address + '\n' + this.address2;
        }
        return address + '\n' + this.city + ', ' + this.state + ' ' + this.zip;
    }

    //returns false on failure
    setFromString = (addressString:string) => {
        let address = '', address2 = '', city = '', state = '', zip = '';
        let trimmedAddressString = addressString.trim();
        let addressLines = trimmedAddressString.split('\n');
        if (addressLines.length == 2 || addressLines.length == 3){
            if(addressLines[0].length == 0){
                return false;
            } else {
                address = addressLines[0];
                if(addressLines.length == 3){
                    address2 = addressLines[1];
                }
            }
            let lastAddressLine = addressLines[addressLines.length - 1].split(',');
            if (lastAddressLine.length != 2 ||
                lastAddressLine[0].length == 0 ||
                lastAddressLine[1].length == 0){
                return false;
            } else {
                city = lastAddressLine[0];
            }
            let lastSpaceIndex = lastAddressLine[1].lastIndexOf(' ');
            state = lastAddressLine[1].slice(0, lastSpaceIndex);
            zip = lastAddressLine[1].slice(lastSpaceIndex + 1);
            if (state.length == 0 || zip.length == 0){
                return false;
            }
        } else {
            return false;
        }

        this.address = address.trim();
        this.address2 = address2.trim();
        this.city = city.trim();
        this.state = state.trim();
        this.zip = zip.trim();
        return true;
    }

}
