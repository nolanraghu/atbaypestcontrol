// This needs to include the frequency the product should be applied, any equipment needed, maybe price,
// instructions, etc.

import Equipment from "./Equipment";
import {getEquipmentInfo} from "../../controller/EquipmentPulling";

interface ProductProps {
    id: string,
    image: NodeRequire,
    name: string,
    description: string,
    equipment: Array<string>,
    price: number,
}




export default class Product{
    id: string
    equipment: Array<Equipment>
    image: NodeRequire
    name: string
    description: string
    price: number
    constructor(props: ProductProps){
        this.id = props.id;
        this.equipment = [];
        for(var id in props.equipment){
            this.equipment.push(getEquipmentInfo(props.id))
        };
        this.image = props.image;
        this.productName = props.productName;
        this.productDetails = props.productDetails;
    }
    getProductImage = () => {
        return this.image;
    }

    getProductName = () => {
        return this.productName;
    }

    getProductDetails = () => {
        return this.productDetails;
    }

    equipmentList = () => {
        return this.equipment;
    }
}
