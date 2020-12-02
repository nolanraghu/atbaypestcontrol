import {NUMBER_OF_PRODUCTS} from "../Data/UsefulConstants";

interface PayProps {
    id: number,
    cardNumber: string,
    type: string
}

interface PaymentasJSON {
    id: number,
    cardNumber: string,
    type: string
}

export default class Payment implements PayProps{
    id: number = 0;
    cardNumber: string = "";
    type: string = "";
    static singles: Array<Payment> = new Array<Payment>();

    constructor(id: number, cardnumber: string = '', type: string = '') {
        if (typeof Payment.singles[id] === 'undefined') {
            this.id = id;
            this.cardNumber = cardnumber;
            this.type = type;
            Payment.singles[id] = this;
        }
        return Payment.singles[id];
    }

    toString = () => {
        return JSON.stringify(
            {
                id: this.id,
                cardNumber: this.cardNumber,
                type: this.type
            }
        );
    }

    fromString = (jsonString: string) => {
        let json = JSON.parse(jsonString) as PaymentasJSON;
        this.id = json.id;
        this.cardNumber = json.cardNumber;
        this.type = json.type;

        return this;
    }

    getCardNumber = () => {
        return this.cardNumber;
    }

    getCardType = () => {
        return this.type;
    }

    getID = () => {
        return this.id;
    }
}