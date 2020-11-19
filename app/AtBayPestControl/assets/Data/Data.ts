import Infestation from "../Classes/Infestation";
import User from "../Classes/User";
import Email from "../Classes/Email";
import Product from "../Classes/Product";
import Equipment from "../Classes/Equipment";



//EXAMPLE FORMATS

export const EMAIL = [
    [
        new Email("1", "fake.person1@gmail.com", "personal", true),
    ],
    [
        new Email("2", "fake.person2@gmail.com", "work", false),
    ],
    [
        new Email("3", "fake.person3@gmail.com", "play", false),
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

export function getUser():User{
    //TODO
    return user;

}