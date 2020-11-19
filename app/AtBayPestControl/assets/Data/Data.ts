import Infestation from "../Classes/Infestation";
import User from "../Classes/User";
import Product from "../Classes/Product";
import Equipment from "../Classes/Equipment";
import {loadUser} from "./Storage";



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



export function getBugsList(){
    //TODO
    return [new Infestation(0), new Infestation(1), new Infestation(2), new Infestation(3)];
}

export function getBugByID(id: number):Infestation{
    //TODO
    return new Infestation(id);
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
    return new Infestation(0);
}

export function getUser(){
    let RayJ= new User();
    loadUser().then(
        (user) => {
            RayJ = user;
            return RayJ;
        }
    );
    return RayJ;

}
