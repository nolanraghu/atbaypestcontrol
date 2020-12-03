// This will be very simple, including probably a picture and a name, perhaps a description and instructions,
// all straight from the database

import {getEquipmentInfo} from "../../controller/EquipmentPulling";
import Images from '../images/index';
import {NUMBER_OF_EQUIPMENT} from "../Data/UsefulConstants";

interface EquipmentasJSON {
    id: number,
    image: string, // String?!?
    name: string,
    description: string,
    price: number
}

export default class Equipment {
    private readonly id: number = -1
    private readonly image: NodeRequire = Images.error;
    private readonly name: string = "Error";
    private readonly description: string = "Error";
    private readonly price: number = -1;
    static singles: Array<Equipment> = new Array<Equipment>(NUMBER_OF_EQUIPMENT)

    constructor(id: number){
        if(typeof Equipment.singles[id] === "undefined") {
            this.id = id;
            let pData = getEquipmentInfo(this.id);
            this.image = Images.equipment[id];
            this.name = pData.name;
            this.description = pData.description;
            this.price = pData.price;
            Equipment.singles[id] = this;
        }
        return Equipment.singles[id];
    }

    getEquipmentImage = () => {
        return this.image;
    }

    equals = (e: Equipment) => {
        return e.getID() == this.getID();
    }

    getEquipmentDescription = () => {
        return this.description
    }
    getName = () => {
        return this.name;
    }
    getPrice = () => {
        return this.price;
    }
    getID = () => {
        return this.id;
    }
    isEqual = (equipment:Equipment) => {
        return this.id == equipment.getID();
    }
}
