// Each User will have a Plan, and information. The payment information can't be stored on the database, but I think
// I read there's a way to have an internal database as well, and this class would be in charge of reading that as well
// Also the user information will determine all the state details of the app

import Plan from "./Plan";
import Equipment from "./Equipment";
import Product from "./Product";
import Infestation from "./Infestation";

interface UserasJSON {
    userPlan: Plan;
    currentEquipment: Array <number>;
    removedEquipment: Array <number>;
}
export default class User {
    //TODO: Add all of the personal information here and have it be used by Profile tab
    // If this is 0, that should mean they haven't made an account yet
    private id: number
    private userPlan: Plan
    private currentEquipment: Array<Equipment>
    private removedEquipment: Array<Equipment>
    constructor(id:number = 0){
        this.id = id;
        this.userPlan = new Plan

        this.currentEquipment = [];
        for (let x in this.currentEquipment) {
            this.currentEquipment.push(new Equipment(Number(x)));
        }

        this.removedEquipment = [];
        for (let x in this.removedEquipment) {
            this.removedEquipment.push(new Equipment(Number(x)));
        }
    }

    private stringList = (arr: Array<Equipment>) => {
        let ids: Array<number> = [];
        arr.forEach(
            function (equipment){
                ids.push(equipment.getID())
            }
        );
        return ids;
    }

    toString = () => {
        return JSON.stringify(
            {
                userPlan: this.userPlan,
                currentEquipment: this.stringList(this.currentEquipment),
                removedEquipment: this.stringList(this.removedEquipment),
            }
        );
    }

    fromString = (jsonString: string) => {
        let json = JSON.parse(jsonString) as UserasJSON;
        json.currentEquipment.forEach(
            (id) =>{
                this.currentEquipment.push(new Equipment(id));
            }
        );
        json.removedEquipment.forEach(
            (id) =>{
                this.removedEquipment.push(new Equipment(id));
            }
        );
    }

    hasAccount = () => {
        return this.id != 0
    }
    getPlan = () => {
        return this.userPlan;
    }
    hasEquipment = (equipment:Equipment) => {
        //TODO
        return this.currentEquipment.includes(equipment);
    }

    //getPendingEquipment
    hadEquipment = (equipment:Equipment) => {
        return this.removedEquipment.includes(equipment);
    }
    removeEquipment = (equipment:Equipment) => {
        // This removes the equipment from the list of equipment the user has, but adds it to a list of equipment
        // the user once owned

        const curSet = new Set(this.currentEquipment);
        const pastSet = new Set(this.removedEquipment);

        if (curSet.has(equipment)) {

            // Removes from current equipment
            curSet.delete(equipment);
            this.currentEquipment = [... curSet];

            // Adds to removed equipment
            pastSet.add(equipment);
            this.removedEquipment = [... pastSet];
        }
    }
    addEquipment = (equipment:Equipment) => {
        // This adds the equipment to the list of equipment the user has, and also adds it to the upcoming
        // purchases in the plan

        const curSet = new Set(this.currentEquipment);

        if (!curSet.has(equipment)) {
            this.addHasEquipment(equipment);
            // TODO Add to upcoming purchases
        }

    }
    addHasEquipment = (equipment:Equipment) => {
        // This ONLY adds the equipment to the list of equipment the user has

        const curSet = new Set(this.currentEquipment);

        if (!curSet.has(equipment)) {
            // Adds to current equipment
            curSet.add(equipment);
            this.currentEquipment = [... curSet];
        }
    }
    makePayment = (price:number) => {
        // TODO: but not related to the database
        console.log("Pay $" + price )
    }
    setMonthlyPayments = (price:number, nextDate:Date) => {
        // Note: the date of nextDate should be <= 28
        // TODO: but not related to the database
        console.log("Next Payment: $" + price + " on " + nextDate)
    }
    purchaseItems = (item:(Product|Equipment)[]) => {
        // Sends the list of items that the user has purchased (separate from the plan) to the client
        // TODO
        console.log("Purchased")
    }
}