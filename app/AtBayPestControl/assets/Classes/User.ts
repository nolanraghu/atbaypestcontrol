// Each User will have a Plan, and information. The payment information can't be stored on the database, but I think
// I read there's a way to have an internal database as well, and this class would be in charge of reading that as well
// Also the user information will determine all the state details of the app

import Plan from "./Plan";

export default class User {
    // If this is 0, that should mean they haven't made an account yet
    private id: number
    constructor(id:number = 0){
        this.id = id;
    }
    hasAccount = () => {
        return this.id != 0
    }
    getPlan = () => {
        //TODO
        return new Plan(0)
    }
}