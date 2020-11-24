// This needs to include the frequency the product should be applied, any equipment needed, maybe price,
// instructions, etc.

import Equipment from "./Equipment";
import {getEquipmentInfo} from "../../controller/EquipmentPulling";
import {getInfestationInfo} from "../../controller/InfestationPulling";
import {getProductInfo} from "../../controller/ProductPulling";
import image from "../images";
import {getEquipmentByID} from "../Data/Data";
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
    private equipment: Array<number> = []
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
            this.timeline = pData.timeline
            this.equipment = [];
            for (let x in pData.equipment) {
                this.equipment.push(Number(x));
            }
            Product.singles[id] = this;
        }
        return Product.singles[id];
    }

    toString = () => {
        let eqIDs: Array<number> = [];
        this.equipment.forEach(
            function (eq){
                eqIDs.push(eq)
            }
        );
        return JSON.stringify(
            {
                id: this.id,
                image: this.image,
                name: this.name,
                description: this.description,
                equipment: eqIDs,
                price: this.price,
                timeline: this.timeline
            }
        );
    }

    fromString = (jsonString: string) => {
        let json = JSON.parse(jsonString) as ProductasJSON;
        this.id = json.id;
        this.image = image.product[this.id]; // TODO Fix this
        this.name = json.name;
        this.description = json.description;

        json.equipment.forEach(
            (id) => {
                this.equipment.push(id);
            }
        );
        this.price = json.price;
        this.timeline = json.timeline;
    }

    equals = (e: Product) => {
        return e.getID() == this.getID();
    }

    getProductImage = ():any => {
        return this.image;
    }

    getProductName = () => {
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
