import * as React from 'react';
import * as Text from '../assets/text/text';

//this is kinda fakey right now because idk about the db
export function getProductInfo(pid: String) {
    return {
        "pid": pid,
        "name": "MockName",
        "price": "Stuff @ ../assets/text/prices/product"+pid+".txt",
        "image": require("../assets/images/product" + pid+ ".png"),
        "shortDescription":"Stuff @../assets/text/shortDescriptions/product"+pid+".txt",
        "description": "Stuff @../assets/text/descriptions/product"+pid+".txt",

    }
}
