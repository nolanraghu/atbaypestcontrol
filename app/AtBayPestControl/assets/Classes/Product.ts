// This needs to include the frequency the product should be applied, any equipment needed, maybe price,
// instructions, etc.

import {getProductInfo} from "../../controller/ProductPulling";
import image from "../images";
import {NUMBER_OF_PRODUCTS} from "../Data/UsefulConstants";

interface ProductasJSON {
    id: number,
    image: string,
    name: string,
    description: string,
    equipment: Array<number>,
    price: number,
    timeline: string,
}

export default class Product{
    private id: number = -1
    private image: NodeRequire = image.error
    private name: string = "Error"
    private description: string = "Error"
    private readonly equipment: Array<number> = []
    private price: number = -1
    private timeline: string = "Error"
    static singles: Array<Product> = new Array<Product>(NUMBER_OF_PRODUCTS)


    constructor(id: number){
        if(typeof Product.singles[id] === 'undefined') {
            this.id = id;
            let pData = getProductInfo(this.id);
            this.image = image.product[id];
            this.name = pData.name;
            this.description = pData.description;
            this.timeline = pData.timeline;
            this.price = pData.price;
            this.equipment = [];
            for (let x of pData.equipment) {
                this.equipment.push(x);
            }
            Product.singles[id] = this;
        }
        return Product.singles[id];
    }



    equals = (e: Product) => {
        return e.getID() == this.getID();
    }

    getProductImage = ():any => {
        return this.image;
    }

    getName = () => {
        return this.name;
    }

    getProductDetails = () => {
        return this.description;
    }

    getEquipmentList = () => {
        return this.equipment;
    }

    getTimeline = () => {
        return this.timeline;
    }
    getID = () => {
        return this.id;
    }

    getPrice = () => {
        return this.price;

    }
}
