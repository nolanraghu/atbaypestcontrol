// This needs to include the frequency the product should be applied, any equipment needed, maybe price,
// instructions, etc.

import Equipment from "./Equipment";
import {getEquipmentInfo} from "../../controller/EquipmentPulling";
import {getInfestationInfo} from "../../controller/InfestationPulling";
import {getProductInfo} from "../../controller/ProductPulling";

// This bitch unsued
interface ProductProps {
    id: number,
    image: NodeRequire,
    name: string,
    description: string,
    equipment: Array<String>,
    price: number,
}

export default class Product{
    private readonly id: number
    private readonly image: NodeRequire
    private readonly name: string
    private readonly description: string
    private readonly equipment: Array<Equipment>
    private readonly price: number

    constructor(id: number){
        this.id = id;
        let pData = getProductInfo(this.id);
        this.image = pData.image;
        this.name = pData.name;
        this.description = pData.description;

        let counter = 0;
        this.equipment = [];
        for(let x in pData.equipment){
           this.equipment.push(new Equipment(Number(x)))
            counter += 1;
        };

        this.price = pData.price;
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

    equipmentList = () => {
        return this.equipment;
    }

    getID = () => {
        return this.id;
    }

    getPrice = () => {
        return this.price;
    }
}
