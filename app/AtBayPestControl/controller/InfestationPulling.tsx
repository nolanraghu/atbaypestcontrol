import * as React from 'react';
import {allInfestations} from '../assets/Data/allInfestations';

//this is kinda fakey right now because idk about the db


export function getInfestationInfo(bId: String) {
    let k ={
        id: "0",
        image: require("../assets/images/error.jpg"),
        name: "ErrorName",
        description: "Error",
        products: ["0"],
        price: 0
    };
    switch(bId){
        case "b1":
            k = allInfestations[0];
            break;
        case "b2":
            k = allInfestations[1];
            break;
        case "b3":
            k = allInfestations[2];
            break;
        case "b4":
            k = allInfestations[3]
            break;
    }
    return k;
}
