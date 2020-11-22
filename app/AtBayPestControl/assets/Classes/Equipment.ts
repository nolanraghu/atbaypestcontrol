// This will be very simple, including probably a picture and a name, perhaps a description and instructions,
// all straight from the database

import {getEquipmentInfo} from "../../controller/EquipmentPulling";
import Images from '../images/index';

export default class Equipment {
    private readonly id: number;
    private readonly image: NodeRequire;
    private readonly name: string;
    private readonly description: string;
    private readonly price: number;

    constructor(id: number){
        this.id = id;
        let pData = getEquipmentInfo(this.id);
        this.image = Images.equipment[id];
        this.name = pData.name;
        this.description = pData.description;
        this.price = pData.price;
    }


    getEquipmentImage = () => {
        //TODO
        return this.image;
    }

    equals = (e: Equipment) => {
        return e.getID() == this.getID();
    }

    getEquipmentDescription = () => {
        //TODO
        return this.description
    }
    getEquipmentName = () => {
        //TODO
        return this.name;
    }
    getPrice = () => {
        //TODO
        return this.price;
    }
    getID = () => {
        return this.id;
    }
    isEqual = (equipment:Equipment) => {
        return this.id == equipment.getID();
    }
}
