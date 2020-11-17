// This needs to include the frequency the product should be applied, any equipment needed, maybe price,
// instructions, etc.

import Equipment from "./Equipment";

interface ProductProps {
    id: number,
    equipmentIds: Array<number>,
    image: NodeRequire,
    productName: string,
    productDetails: string,
}


export default class Product{
    id: number
    equipment: Array<Equipment>
    image: NodeRequire
    productName: string
    productDetails: string
    constructor(props: ProductProps){
        this.id = props.id;
        this.equipment = []
        for(var id in props.equipmentIds){
            //this.equipmentIds.push(getEquipmentbyId(props.id))
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
