import Infestation from "../Classes/Infestation";
import User from "../Classes/User";
import Email from "../Classes/Email";
import Address from "../Classes/Address";
import Product from "../Classes/Product";
import Equipment from "../Classes/Equipment";
import {EMAIL} from "../Data/allEmails";
import {LOC} from "./allAddresses";
import {PAY} from "./allPayments";


//EXAMPLE FORMATS

export const PLAN = "Current Plan"


//Infestation pulls from Async
//User from a database

const bug1 = new Infestation(0);
const user = new User("0","Joe Smith", EMAIL, LOC, PAY,
    require("../images/profile_picture.jpg"), require("../images/splash.png"));

export function getBugsList(){
    //TODO
    return [bug1];
}

export function getBugByID(id: number){
    //TODO
    return bug1;
}

export function getProductByID(id: number):Product{
    //TODO
    return (new Product(id))
}

export function getEquipmentByID(id:number):Equipment{
    //TODO
    return (new Equipment(id))
}

export function getPreventionPlan():Infestation{
    //TODO
    return bug1;
}

export function getUser(){
    //TODO
    return user;

}

export function requiredPlanTime(){
    return "3 months";
}
