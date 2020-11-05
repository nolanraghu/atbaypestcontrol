import * as React from 'react';

//this is kinda fakey right now because idk about the db

export function getBugInfo(bId: String) {
    let k ={
        pid: bId,
        name: "Error",
        price: "Error",
        image: require("../assets/images/error.jpg"),
        shortDescription:"Error",
        description: "Error",
    };
    switch(bId){
        case "b1":
            k.name = "Honey Bee";
            k.image = require('../assets/images/honey_bee.png');
            k.price = "$4.99"
            break;
        case "b2":
            k.name = "Ants";
            k.image = require('../assets/images/ant.png');
            k.price = "$6.99"
            break;
        case "b3":
            k.name = "Another Ant";
            k.image  =require("../assets/images/ant2.jpg");
            k.price = "$6.99"
            break;
        case "b4":
            k.name = "Blue Beetle";
            k.image =require('../assets/images/blue_beetle.png');
            k.price = "$39.99"
            break;
        case "b5":
            k.name = "Beetle";
            k.image=require('../assets/images/beetle.png');
            k.price = "$9.99"
            break;
        case "b6":
            k.name = "Another Honey Bee";
            k.image=require('../assets/images/honey_bee2.jpg');
            k.price = "4.99"
            break;
        case "b7":
            k.name = "And Yet Another Honey Bee";
            k.image=require("../assets/images/honey_bee3.jpg");
            break;
        case "b8":
            k.name = "Antz"
            k.image=require("../assets/images/ant3.jpg");
            break;
    }
    k.shortDescription = "A short description on the nature of "+k.name;
    k.description = "A long description on the nature of "+k.name;

    return k;
}
