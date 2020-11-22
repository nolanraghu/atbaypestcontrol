interface PayProps {
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

    getCardNumber = () => {
        return this.cardNumber;
    }

    getCardType = () => {
        return this.type;
    }
}