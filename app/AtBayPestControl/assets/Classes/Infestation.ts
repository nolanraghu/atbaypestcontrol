import {getInfestationInfo} from "../../controller/InfestationPulling";
import image from '../images/index';
import {NUMBER_OF_INFESTATIONS} from "../Data/UsefulConstants";

export default class Infestation {
    private id: number = -1;
    private image: NodeRequire = image.error;
    private name: string = "Error"
    private description: string = "Error"
    private readonly products: Array<number> = []
    private upfrontPrice: number = -1
    private monthlyPrice: number = -1
    private duration: number = -1
    private purchaseDate: Date = new Date(0);
    static singles: Array<Infestation> = new Array<Infestation>(NUMBER_OF_INFESTATIONS);
    constructor(id:number) {
        if(typeof Infestation.singles[id] === 'undefined') {
            this.id = id;
            let pData = getInfestationInfo(this.id);
            this.image = image.infestations[id];
            this.name = pData.name;
            this.description = pData.description;
            this.products = [];
            for (let x of pData.products) {
                this.products.push(x);
            }
            this.upfrontPrice = pData.upfrontPrice;
            this.monthlyPrice = pData.monthlyPrice;
            this.duration = pData.duration;
            this.purchaseDate = new Date(0);
            Infestation.singles[id] = this;
        }
        return Infestation.singles[id];
    }

    getID = () => {
        return this.id;
    }

    equals = (e: Infestation) => {
        return e.getID() == this.getID();
    }
    isPreventionPlan = () => {
        return this.id == 0
    }
    getBugImage = ():any => {
        //Gets the image source for the bug
        return this.image
    }
    getBugName = () => {
        return this.name
    }
    getBugDescription = () => {
        // Note: This should include the required time they have to be on the plan before they delete it, if that
        // exists. You could program this in or pass the instructions along to the client, or whoever is filling
        // in the database
        return this.description
    }

    getProducts = () => {
        return this.products
    }

    getUpfrontPrice = () => {
        return this.upfrontPrice
    }

    getMonthlyPrice = () => {
        // Note: the monthly price does not include the equipment, but should include any one time products. I
        // think it's best if the client sets these prices, which will be put in the database, but make sure when they
        // do they know that the equipment price is going to be added to the upfront price, so it will be actually
        // higher when the customer pays. This is so if the customer already has the equipment for another plan, they
        // don't end up getting charged for it again.
        return this.monthlyPrice
    }

    getRequiredPlanTime = ():string => {
        //Note: in months
        switch(this.name){
            case "Base Plan":
                return "6 Months";

            case "Cockroach":
                return "Single Application";

            case "Spiders":
                return "As Needed";

            case "Mosquitoes":
                return "6 Months";

            default:
                return "This plan has experienced an error :)"
        }
    }

    getDuration = ():number => {
        // Note: returns time in days
        return this.duration;
    }

    getPurchaseDate = () => {
        // Gets the day that the first purchase was made. If it hasn't been set, return today's date
        let nullDate = new Date(0);
        return this.purchaseDate != nullDate? this.purchaseDate: new Date();
    }

    getPaymentExpiryDate = ():Date => {
        let purDate = this.getPurchaseDate(); // sets purDate to current Date
        let expDateMS = purDate.setDate((purDate.getDate() + this.duration))
        return new Date(expDateMS);
    }

}
