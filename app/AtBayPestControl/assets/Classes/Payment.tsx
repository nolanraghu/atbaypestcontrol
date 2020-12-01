interface PayProps {
    id: string,
    cardNumber: string,
    type: string
}

interface PaymentasJSON {
    id: string,
    cardNumber: string,
    type: string
}

export default class Payment implements PayProps{
    id: string = "";
    cardNumber: string = "";
    type: string = "";

    constructor(id: string = "", cardNumber: string = "", type: string = "") {
        this.id = id;
        this.cardNumber = cardNumber;
        this.type = type;
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