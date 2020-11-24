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

//EXAMPLE FORMATS

export const PLAN = "Current Plan"


//Infestation pulls from Async
//User from a database


let user:User = new User();
let instantiated = false;

export function getBugsList(){
    //TODO
    return Infestation.singles;
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
    return User.theUser? User.theUser: new User();
}

function instantiateUser(){
    loadUser().then((hi)=>{
        user = hi;
    })
    instantiated = true;
}

export function save(){
    storeUser(user);
}
