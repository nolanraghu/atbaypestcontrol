import {getInfestationInfo} from "../../controller/InfestationPulling";
import image from '../images/index';
import {NUMBER_OF_INFESTATIONS} from "../Data/UsefulConstants";

interface InfestationasJSON {
    id: number,
    name: string,
    image: string, // Is this still a string? Jinkies
    description: string,
    products: Array<number>,
    upfrontPrice: number,
    monthlyPrice: number
}

export default class Infestation {
    private readonly id: number = -1;
    private readonly image: NodeRequire =image.error;
    private readonly name: string = "Error"
    private readonly description: string = "Error"
    private readonly products: Array<number> = []
    private upfrontPrice: number = -1
    private monthlyPrice: number = -1
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
}
