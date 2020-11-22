import * as React from 'react';
import {allProducts} from '../assets/Data/allProducts';

//this is kinda fakey right now because idk about the db

export function getProductInfo(pid: number) {
    let k ={
        id: -1,
        name: "ErrorName",
        description: "ErrorDetails",
        equipment: [-1],
        price: 0,
        timeline: "As Needed"
    };
    switch(pid){
        case 0:
            k = allProducts[0];
            break;
        case 1:
            k = allProducts[1];
            break;
        case 2:
            k = allProducts[2];
            break;
        case 3:
            k = allProducts[3];
            break;
        case 4:
            k = allProducts[4];
            break;
        case 5:
            k = allProducts[5];
            break;
        case 6:
            k = allProducts[6];
            break;
        case 7:
            k = allProducts[7];
            break;
        case 8:
            k = allProducts[8];
            break;
    }
    return k;
}
