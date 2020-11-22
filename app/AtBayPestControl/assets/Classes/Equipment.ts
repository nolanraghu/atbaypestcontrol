// This will be very simple, including probably a picture and a name, perhaps a description and instructions,
// all straight from the database

import {getEquipmentInfo} from "../../controller/EquipmentPulling";
import Images from '../images/index';

interface EquipmentasJSON {
    id: number,
    image: string, // String?!?
    name: string,
    description: string,
    price: number
}

export default class Equipment {
    private id: number;
    private image: NodeRequire;
    private name: string;
    private description: string;
    private price: number;

    constructor(id: number){
        this.id = id;
        let pData = getEquipmentInfo(this.id);
        this.image = Images.equipment[id];
        this.name = pData.name;
        this.description = pData.description;
        this.price = pData.price;
    }

    toString = () => {
        return JSON.stringify(
            {
                id: this.id,
                image: this.image,
                name: this.name,
                description: this.description,
                price: this.price
            }
        );
    }

    fromString = (jsonString: string) => {
        let json = JSON.parse(jsonString) as EquipmentasJSON;

        this.id = json.id;
        this.image = require(json.image); // TODO Fix this
        this.name = json.name;
        this.description = json.description;
        this.price = json.id;
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
