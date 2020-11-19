import Infestation from "../Classes/Infestation";
import User from "../Classes/User";
import Email from "../Classes/Email";
import Address from "../Classes/Address";



//EXAMPLE FORMATS

export const EMAIL = [
    new Email("1", "fake.person1@gmail.com", "personal", true),
    new Email("2", "fake.person2@gmail.com", "work", false),
    new Email("3", "fake.person3@gmail.com", "play", false),
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
    new Address('1 Real Place', 'New York City', 'New York', '12345'),
    new Address('2 Real Place', 'Nashville', 'Tennessee', '678910'),
]

export const PLAN = "Current Plan"


//Infestation pulls from Async
//User from a database

const bug1 = new Infestation(0);
const user = new User("0","Joe Smith", EMAIL, LOC,
    require("../images/profile_picture"), require("../images/splash"));

export function getBugsList(){
    //TODO
    return [bug1];
}

export function getBugByID(id: number){
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
