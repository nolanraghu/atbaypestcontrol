// This needs to include the frequency the product should be applied, any equipment needed, maybe price,
// instructions, etc.

import Equipment from "./Equipment";

export default class Product{
    id: number
    constructor(id: number){
        this.id = id
    }
    getProductImage = () => {
        return require('../images/product1.jpg');
    }

    getProductName = () => {
        return "Bug Killer 3000";
    }

    getProductDetails = () => {
        return "This kills bugs";
    }

    equipmentList = () => {
        let equipment1 = new Equipment(0)
        return [equipment1];
    }
}