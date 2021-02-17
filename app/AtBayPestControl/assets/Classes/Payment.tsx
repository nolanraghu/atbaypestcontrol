import {NUMBER_OF_PRODUCTS} from "../Data/UsefulConstants";

interface PayProps {
    cardNumber: string,
    type: string
}

interface PaymentasJSON {
    cardNumber: string,
    type: string
}

export default class Payment implements PayProps{
    cardNumber: string = "";
    type: string = "";

    constructor(cardnumber: string = '', type: string = '') {
            this.cardNumber = cardnumber;
            this.type = type;
    }

    toString = () => {
        return JSON.stringify(
            {
                cardNumber: this.cardNumber,
                type: this.type
            }
        );
    }

    fromString = (jsonString: string) => {
        let json = JSON.parse(jsonString) as PaymentasJSON;
        this.cardNumber = json.cardNumber;
        this.type = json.type;
        return this;
    }

    getCardNumber = (): string => {
        return this.cardNumber ;
    }

    getCardType = () => {
        return this.type ;
    }

    setCardNumber = (s:string) => {
        this.cardNumber = s;
    }

    setCardType = (s:string) => {
        this.type = s;
    }

}
