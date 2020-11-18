import Infestation from "../Classes/Infestation";
import User from "../Classes/User";
import Product from "../Classes/Product";



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

const bug1 = new Infestation(0);
const user = new User()

export function getBugsList(){
    //TODO
    return [bug1];
}

export function getBugByID(id: string):Infestation{
    //TODO
    return bug1;
}

export function getProductByID(id: number):Product{
    return (new Product(id))
}

export function getPreventionPlan():Infestation{
    //TODO
    return bug1;
}

export function getUser():User{
    //TODO
    return user;

}