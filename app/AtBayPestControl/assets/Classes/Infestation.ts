// I thought the name Infestation was more accurate than Bug
// This class contains all the information I learned about classes.
// TODO: Decide how we want things to display when we aren't connected to the database. Should they still be able
//  to access all the information as it was when they last connected, then if they try to make a change receive
//  an error? That's what I think it should be? Which brings up my question about the database. Is the database at
//  a url? Or is it stored in the www folder and then updates itself?


import Product from "./Product";
import {getInfestationInfo} from "../../controller/InfestationPulling";

interface InfestationProps {
    id: string,
    image: NodeRequire,
    name: string,
    description: string,
    products: Array<string>,
    price: number
}


export default class Infestation {
    // We should use id's so we can find them in the database, everything else should be accessed from the database
    // using accessor functions, probably. Just in case we need it for local changes or something, I've included other
    // examples
    private readonly id: number
    private readonly image: NodeRequire
    private readonly name: string
    private readonly description: string
    private readonly products: Array<Product>
    private readonly price: number
    constructor(id:number){
        //TODO: ideally we probably don't need the id in the constructor? Depends on how we
        // implement it in Data.ts I suppose
        this.id = id;
        let pData = getInfestationInfo(this.id);
        this.image = pData.image;
        this.name = pData.name;
        this.description = pData.description;
        this.products = [];
        for(let x in pData.products){
            this.products.push(new Product(x));
        }
        this.price = pData.price;



    }
    getID = () => {
        return this.id;
    }
    isPreventionPlan = () => {
        return this.id == 0
    }
    //Gets the image source for the bug
    getBugImage = () => {
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
    getPrice = ():{monthly: number, upFront: number} => {
        // Note: the monthly price does not include the equipment, but should include any one time products. I
        // think it's best if the client sets these prices, which will be put in the database, but make sure when they
        // do they know that the equipment price is going to be added to the upfront price, so it will be actually
        // higher when the customer pays. This is so if the customer already has the equipment for another plan, they
        // don't end up getting charged for it again.
        //TODO
        return {monthly:11.99, upFront:5}
    }
    getRequiredPlanTime = ():number => {
        //Note: in months
        return 0;
    }
}
