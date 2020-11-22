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



//EXAMPLE FORMATS

export const PLAN = "Current Plan"


//Infestation pulls from Async
//User from a database

const bug1 = new Infestation(0);
const equipment = [new Equipment(0), new Equipment(1), new Equipment(2)]
const products = [new Product(0), new Product(1), new Product(2), new Product(3), new Product(4), new Product(5), new Product(6), new Product(7), new Product(8)]
const infestations = [new Infestation(0), new Infestation(1), new Infestation(2), new Infestation(3)]

let user:User = new User();
let instantiated = false;

export function getBugsList(){
    //TODO
    return infestations;
}

export function getBugByID(id: number):Infestation{
    //TODO
    return infestations[id];
}

export function getProductByID(id: number):Product{
    //TODO
    return products[id]
}

export function getEquipmentByID(id:number):Equipment{
    //TODO
    return equipment[id];
}

export function getPreventionPlan():Infestation{
    //TODO
    return infestations[0];
}

export function getUser(){
    return user;
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
