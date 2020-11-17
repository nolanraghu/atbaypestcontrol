import * as React from 'react';
import {allInfestions} from '../assets/Data/allInfestations';

//this is kinda fakey right now because idk about the db


export function getInfestationInfo(bId: String) {
    let k ={
        id: "0",
        image: require("../assets/images/error.jpg"),
        name: "ErrorName",
        description: "Error",
        products: [-1],
        price: 0
    };
    switch(bId){
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
            break;
    }
    return k;
}
