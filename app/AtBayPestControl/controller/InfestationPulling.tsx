import * as React from 'react';
import {allInfestations} from '../assets/Data/allInfestations';

//this is kinda fakey right now because idk about the db


export function getInfestationInfo(bId: number) {
    let k ={
        id: -1,
        name: "ErrorName",
        description: "Error",
        products: [0],
        upfrontPrice: 0,
        monthlyPrice: 0,
        duration: 0,
    };
    switch(bId){
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
            break;
    }
    return k;
}
