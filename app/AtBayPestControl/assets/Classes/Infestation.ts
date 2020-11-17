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
    private id: string
    private image: NodeRequire
    private name: string
    private description: string
    private products: Array<Product>
    private price: number
    product1 = new Product(0);
    product2 = new Product(2);
    constructor(id:string){
        //TODO: ideally we probably don't need the id in the constructor? Depends on how we
        // implement it in Data.ts I suppose
        this.id = id;
        let pData = getInfestationInfo(this.id);
        this.image = pData.image;
        this.name = pData.name;
        this.description = pData.description;
        let counter = 0;
        this.products = [];
        for(let x in pData.products){
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
        return require('../images/honey_bee.png')
    }
    getBugName = () => {
        //TODO
        return 'Honeybee'
    }
    getBugDescription = () => {
        //TODO
        return 'Now, let me tell you about bees.....Now, let me tell you about bees.....Now, let me tell you ' +
            'about bees.....Now, let me tell you about bees.....Now, let me tell you about bees.....Now, let ' +
            'me tell you about bees.....Now, let me tell you about bees.....Now, let me tell you about bees...' +
            '..Now, let me tell you about bees.....Now, let me tell you about bees.....Now, let me tell you about ' +
            'bees.....Now, let me tell you about bees.....Now, let me tell you about bees.....Now, let me tell you ' +
            'about bees.....Now, let me tell you about bees.....Now, let me tell you about bees.....Now, let me ' +
            'tell you about bees.....Now, let me tell you about bees.....Now, let me tell you about bees.....Now, ' +
            'let me tell you about bees.....'
    }

    getProducts = () => {
        //TODO
        return [this.product1, this.product2];
    }
    getPrice = ():number => {
        //TODO
        return 3.99
    }
}
