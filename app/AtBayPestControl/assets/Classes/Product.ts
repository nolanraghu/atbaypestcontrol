// This needs to include the frequency the product should be applied, any equipment needed, maybe price,
// instructions, etc.

import Equipment from "./Equipment";
import {getEquipmentInfo} from "../../controller/EquipmentPulling";
import {getInfestationInfo} from "../../controller/InfestationPulling";
import {getProductInfo} from "../../controller/ProductPulling";

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
        this.image = eval(pData.image);
        this.name = pData.name;
        this.description = pData.description;
        this.timeline = pData.timeline
        let counter = 0;
        this.equipment = [];
        for(let x in pData.equipment){
           this.equipment.push(new Equipment(Number(x)))
            counter += 1;
        }

        this.price = pData.price;
    }

    toString () {
        return JSON.stringify(this);
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
}
