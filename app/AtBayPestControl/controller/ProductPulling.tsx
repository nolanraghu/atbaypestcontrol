import * as React from 'react';

//this is kinda fakey right now because idk about the db

export function getProductInfo(pid: String) {
    let k ={
        pid: pid,
        name: "Product "+pid.substr(1),
        price: "Price of Product "+pid.substr(1),
        image: require("../assets/images/error.jpg"),
        shortDescription:"Short Description of Product"+pid.substr(1),
        description: " (Long) Description of Product"+pid.substr(1),
    };
    switch(pid){
        case "p1":
            k.image = require("../assets/images/product1.jpg");
            break;
        case "p2":
            k.image = require("../assets/images/product2.png");
            break;
        case "p3":
            k.image  =require("../assets/images/product3.jpg");
            break;
        case "p4":
            k.image =require("../assets/images/product4.jpeg");
            break;
        case "p5":
            k.image=require("../assets/images/product5.jpeg");
            break;
    }
    return k;
}
