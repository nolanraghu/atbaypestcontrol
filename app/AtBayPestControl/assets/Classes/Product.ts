// This needs to include the frequency the product should be applied, any equipment needed, maybe price,
// instructions, etc.

import Equipment from "./Equipment";
import {getEquipmentInfo} from "../../controller/EquipmentPulling";
import {getInfestationInfo} from "../../controller/InfestationPulling";
import {getProductInfo} from "../../controller/ProductPulling";

// This bitch unsued
interface ProductProps {
    id: string,
    image: NodeRequire,
    name: string,
    description: string,
    equipment: Array<string>,
    price: number,
}

export default class Product{
    private readonly id: string
    private readonly image: NodeRequire
    private readonly name: string
    private readonly description: string
    private readonly equipment: Array<Equipment>
    private readonly price: number

    constructor(id:string){
        this.id = id;
        let pData = getProductInfo(this.id);
        this.image = pData.image;
        this.name = pData.name;
        this.description = pData.description;

        let counter = 0;
        this.equipment = [];
        for(let x in pData.equipments){
            this.equipment.push(new Equipment(x));
            counter += 1;
        };

        this.price = pData.price;
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

    equipmentList = () => {
        return this.equipment;
    }
}
