import {allEquipment} from '../assets/Data/allEquipment';

//this is kinda fakey right now because idk about the db


export function getEquipmentInfo(bId: number) {
    let k ={
        id: -1,
        name: "ErrorName",
        description: "ErrorDescription",
        price: 0
    };
    switch(bId){
        case 0:
            k = allEquipment[0];
            break;
        case 1:
            k = allEquipment[1];
            break;
        case 2:
            k = allEquipment[2];
            break;
    }
    return k;
}
