import * as React from 'react';
import {allProducts} from '../assets/Data/allProducts';

//this is kinda fakey right now because idk about the db

export function getProductInfo(pid: number) {
    let k ={
<<<<<<< Updated upstream
        id: "0",
        image: require('../assets/images/error.jpg'),
        name: "ErrorName",
        description: "ErrorDetails",
<<<<<<< HEAD
=======
        id: -1,
        image: require('../assets/images/error.jpg'),
        name: "ErrorName",
        description: "ErrorDetails",
        equipment: [-1],
>>>>>>> Stashed changes
=======
        equipment: ["0"],
>>>>>>> master
        price: 0
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
