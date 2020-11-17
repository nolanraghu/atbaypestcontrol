import * as React from 'react';
import {allEquipment} from '../assets/Data/allEquipment';

//this is kinda fakey right now because idk about the db


export function getEquipmentInfo(bId: String) {
    let k ={
        id: "0",
        image: require("../assets/images/error.jpg"),
        name: "ErrorName",
        description: "ErrorDescription",
        price: 0
    };
    switch(bId){
        case "e1":
            k = allEquipment[0];
            break;
        case "e2":
            k = allEquipment[1];
            break;
        case "e3":
            k = allEquipment[2];
            break;
    }
    return k;
}
