import Infestation from "../Classes/Infestation";
import User from "../Classes/User";
import Product from "../Classes/Product";
import Equipment from "../Classes/Equipment";
import {loadUser, storeUser} from "./Storage";



//EXAMPLE FORMATS

export const EMAIL = [
    [
        "1",
        "personal",
        "fake.person@gmail.com",
    ],
    [
        "2",
        "work",
        "fake.person2@gmail.com",
    ],
    [
        "3",
        "play",
        "fake.person3@gmail.com",
    ]
]

export const PAY = [
    [
        "1",
        "debit",
        "1234 5678 9101 1121"
    ],
    [
        "2",
        "credit",
        "3141 5161 7181 9202",
    ]
]

export const LOC = [
    [
        ['1 Real Place', 'New York City', 'New York', '12345'],
    ],
    [
        ['2 Real Place', 'Nashville', 'Tennessee', '678910'],
    ]
]

export const PLAN = "Current Plan"


//Infestation pulls from Async
//User from a database

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