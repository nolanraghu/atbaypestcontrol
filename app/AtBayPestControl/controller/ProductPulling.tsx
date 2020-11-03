import * as React from 'react';

//this is kinda fakey right now because idk about the db
export function getProductInfo(pid: String) {
    let k ={
        pid: pid,
        name: "MockName",
        price: "Stuff @ ../assets/text/prices/product"+pid+".txt",
        image: require("../assets/images/error.jpg"),
        shortDescription:"Stuff @../assets/text/shortDescriptions/product"+pid+".txt",
        description: "Stuff @../assets/text/descriptions/product"+pid+".txt",
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
