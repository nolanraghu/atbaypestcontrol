import Infestation from "../Classes/Infestation";
import User from "../Classes/User";
import Email from "../Classes/Email";
import Address from "../Classes/Address";
import Product from "../Classes/Product";
import Equipment from "../Classes/Equipment";
import {EMAIL} from "../Data/allEmails";
import {LOC} from "./allAddresses";
import {PAY} from "./allPayments";
import {loadUser, storeUser} from "./Storage";
import {getInfestationInfo} from "../../controller/InfestationPulling";
import {NUMBER_OF_INFESTATIONS} from "./UsefulConstants";

//EXAMPLE FORMATS

export const PLAN = "Current Plan"


//Infestation pulls from Async
//User from a database


let instantiated = false;


export function getBugsList(){
    let arr = [];
    for (let x = 0; x < NUMBER_OF_INFESTATIONS; ++x) {
            arr.push(getBugByID(x));
    }
    console.log(arr);
    return arr;
}


export function getBugByID(id: number):Infestation{
    //TODO
    if(typeof Infestation.singles[id] === 'undefined'){
        new Infestation(id);
    }
    return Infestation.singles[id];
}

export function getProductByID(id: number):Product{
    //TODO
    if(typeof Product.singles[id] === 'undefined'){
        new Product(id);
    }
    return Product.singles[id]
}

export function getEquipmentByID(id:number):Equipment{
    //TODO
    if(typeof Equipment.singles[id] === 'undefined'){
        new Equipment(id);
    }
    return Equipment.singles[id];
}

export function getPreventionPlan():Infestation{
    //TODO
    return getBugByID(0);
}

export function getUser(){
    instantiateUser();
    return User.theUser? User.theUser: new User();
}

function instantiateUser(){
    loadUser().then((hi)=>{
        User.theUser = hi;
    })
    console.log("The user instantiated from Async at "+User.theUser.toString());
    instantiated = true;
}

export function save(){
    console.log("The user saved to Async at "+User.theUser.toString());
    storeUser(User.theUser).then(r => r,  (reason) =>{throw Error(reason)});
}
