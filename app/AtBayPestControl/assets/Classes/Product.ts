// This needs to include the frequency the product should be applied, any equipment needed, maybe price,
// instructions, etc.

import Equipment from "./Equipment";
import {getEquipmentInfo} from "../../controller/EquipmentPulling";
import {getInfestationInfo} from "../../controller/InfestationPulling";
import {getProductInfo} from "../../controller/ProductPulling";
import images from "../images";
import {getEquipmentByID} from "../Data/Data";

export default class Product{
    private readonly id: number
    private readonly image: NodeRequire
    private readonly name: string
    private readonly description: string
    private readonly equipment: Array<Equipment>
    private readonly price: number
    private readonly timeline: string

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

    equals = (e: Product) => {
        return e.getID() == this.getID();
    }

    getProductImage = () => {
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
