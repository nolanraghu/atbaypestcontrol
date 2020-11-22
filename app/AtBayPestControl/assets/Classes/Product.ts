// This needs to include the frequency the product should be applied, any equipment needed, maybe price,
// instructions, etc.
// Last updated by Anuja on November 22, implemented toString and fromString

import Equipment from "./Equipment";
import {getEquipmentInfo} from "../../controller/EquipmentPulling";
import {getInfestationInfo} from "../../controller/InfestationPulling";
import {getProductInfo} from "../../controller/ProductPulling";
import images from "../images";
import {getEquipmentByID} from "../Data/Data";

interface ProductasJSON {
    id: number;
    image: string;
    name: string;
    description: string;
    equipment: Array<number>;
    price: number;
    timeline: string;
}

export default class Product{
    private id: number
    private image: NodeRequire
    private name: string
    private description: string
    private equipment: Array<Equipment>
    private price: number
    private timeline: string

    constructor(id: number){
        this.id = id;
        let pData = getProductInfo(this.id);
        this.image = images.product[id];
        this.name = pData.name;
        this.description = pData.description;
        this.timeline = pData.timeline
        let counter = 0;
        this.equipment = [];
        for(let x in pData.equipment){
           this.equipment.push(getEquipmentByID(Number(x)))
            counter += 1;
        }

        this.price = pData.price;
    }

    toString = () => {
        let eqIDs: Array<number> = [];
        this.equipment.forEach(
            function (eq){
                eqIDs.push(eq.getID())
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
        this.id = json.id; //number
        json.equipment.forEach(
            (id) => {
                this.equipment.push(new Equipment(id));
            }
        );
        this.price = json.price; // number
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
