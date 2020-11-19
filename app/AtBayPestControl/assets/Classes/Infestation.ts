import Product from "./Product";
import {getInfestationInfo} from "../../controller/InfestationPulling";
import image from '../images/index';
import {getProductByID} from "../Data/Data";

export default class Infestation {
    private readonly id: number
    private readonly image: NodeRequire
    private readonly name: string
    private readonly description: string
    private readonly products: Array<Product>
    private readonly upfrontPrice: number
    private readonly monthlyPrice: number
    constructor(id:number) {
        this.id = id;
        let pData = getInfestationInfo(this.id);
        this.image = image.infestations[id];
        this.name = pData.name;
        this.description = pData.description;
        this.products = [];
        for (let x of pData.products) {
            this.products.push(getProductByID(x));
        }
        this.upfrontPrice = pData.upfrontPrice;
        this.monthlyPrice = pData.monthlyPrice;
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
    //Gets the image source for the bug
    getBugImage = ():any => {
        //TODO
        return this.image
    }
    getBugName = () => {
        //TODO
        return this.name
    }
    getBugDescription = () => {
        // Note: This should include the required time they have to be on the plan before they delete it, if that
        // exists. You could program this in or pass the instructions along to the client, or whoever is filling
        // in the database
        //TODO
        return this.description
    }

    getProducts = () => {
        //TODO
        return this.products
    }

    getUpfrontPrice = () => {
        // Note: the monthly price does not include the equipment, but should include any one time products. I
        // think it's best if the client sets these prices, which will be put in the database, but make sure when they
        // do they know that the equipment price is going to be added to the upfront price, so it will be actually
        // higher when the customer pays. This is so if the customer already has the equipment for another plan, they
        // don't end up getting charged for it again.
        //TODO
        return this.upfrontPrice
    }

    getMonthlyPrice = () => {
        // Note: the monthly price does not include the equipment, but should include any one time products. I
        // think it's best if the client sets these prices, which will be put in the database, but make sure when they
        // do they know that the equipment price is going to be added to the upfront price, so it will be actually
        // higher when the customer pays. This is so if the customer already has the equipment for another plan, they
        // don't end up getting charged for it again.
        //TODO
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
