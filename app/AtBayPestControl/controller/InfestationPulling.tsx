import * as React from 'react';
import {allInfestions} from '../assets/Data/allInfestations';

//this is kinda fakey right now because idk about the db


export function getInfestationInfo(bId: number) {
    let k ={
        id: -1,
        image: require("../assets/images/error.jpg"),
        name: "ErrorName",
        description: "Error",
        products: [-1],
        price: 0
    };
    switch(bId){
<<<<<<< Updated upstream
        case "b1":
            k = allInfestions[0];
            break;
        case "b2":
            k = allInfestions[1];
            break;
        case "b3":
            k = allInfestions[2];
            break;
        case "b4":
            k = allInfestions[3]
=======
        case 0:
            k = allInfestations[0];
            break;
        case 1:
            k = allInfestations[1];
            break;
        case 2:
            k = allInfestations[2];
            break;
        case 3:
            k = allInfestations[3]
>>>>>>> Stashed changes
            break;
    }
    return k;
}
