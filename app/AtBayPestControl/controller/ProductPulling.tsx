import * as React from 'react';
import {allProducts} from '../assets/Data/allProducts.ts';

//this is kinda fakey right now because idk about the db

export function getProductInfo(pid: String) {
    let k ={
        id: "0",
        equipments: [-1],
        image: require('../assets/images/error.jpg'),
        name: "ErrorName",
        description: "ErrorDetails",
        price: 0
    };
    switch(pid){
        case "p1":
            k = allProducts[0];
            break;
        case "p2":
            k = allProducts[1];
            break;
        case "p3":
            k = allProducts[2];
            break;
        case "p4":
            k = allProducts[3];
            break;
        case "p5":
            k = allProducts[4];
            break;
        case "p6":
            k = allProducts[5];
            break;
        case "p7":
            k = allProducts[6];
            break;
        case "p8":
            k = allProducts[7];
            break;
        case "p9":
            k = allProducts[8];
            break;
    }
    return k;
}
