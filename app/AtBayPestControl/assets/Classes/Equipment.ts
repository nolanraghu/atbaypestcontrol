// This will be very simple, including probably a picture and a name, perhaps a description and instructions,
// all straight from the database

import {getEquipmentInfo} from "../../controller/EquipmentPulling";


export default class Equipment {
    private readonly id: number;
    private readonly image: NodeRequire;
    private readonly name: string;
    private readonly description: string;
    private readonly price: number;

    constructor(id: number){
        this.id = id;
        let pData = getEquipmentInfo(this.id);
        this.image = eval(pData.image);
        this.name = pData.name;
        this.description = pData.description;
        this.price = pData.price;
      }

  toJSON() {
        return {
            id: this.id,
            image: this.image,
            name: this.name,
            description: this.description,
            price: this.price
        };
    }

    getEquipmentImage = () => {
        //TODO
        return require('../images/product3.jpg')
    }
    getEquipmentDescription = () => {
        //TODO
        return this.description
    }
    getEquipmentName = () => {
        //TODO
        return 'Sprayer'
    }
    getPrice = () => {
        //TODO
        return 3.00
    }
}
