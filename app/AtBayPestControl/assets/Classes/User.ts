// Each User will have a Plan, and information. The payment information can't be stored on the database, but I think
// I read there's a way to have an internal database as well, and this class would be in charge of reading that as well
// Also the user information will determine all the state details of the app

import Plan from "./Plan";
import Equipment from "./Equipment";

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
    hasEquipment = (equipment:Equipment) => {
        //TODO
        return true;
    }
    hadEquipment = (equipment:Equipment) => {
        // This returns true if the user once had the equipment, but it has been removed
        //TODO
        return false;
    }
    removeEquipment = (equipment:Equipment) => {
        // This removes the equipment from the list of equipment the user has, but adds it to a list of equipment
        // the user once owned
        //TODO
    }
    addEquipment = (equipment:Equipment) => {
        // This adds the equipment to the list of equipment the user has, and also adds it to the upcoming
        // purchases in the plan
        //TODO
    }
    addHasEquipment = (equipment:Equipment) => {
        // This ONLY adds the equipment to the list of equipment the user has
        //TODO
    }
}