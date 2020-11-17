// Each Plan will have Infestations, which have Products. We'll want a getProductList function
// We'll also need each plan to have a start date for each infestation, and the dates ordered for each product,
// as well as if each product has been received. This all needs to be stored in the Plan, not the product or
// Infestation!
//
// This is because the Product and Infestation will be what Brandon edits, whereas the plan is based on what the
// customer does

import Infestation from "./Infestation";
import Product from "./Product";

export default class Plan {
    private id: number
    constructor(id:number){
        this.id = id;
    }
    containsInfestation = (bug:Infestation) => {
        //TODO
        return false;
    }
    isPendingInfestation = (bug:Infestation) => {
        //TODO
        return false;
    }
    isPendingRemoval = (bug:Infestation) => {
        //TODO
        return false;
    }
    isRemovable = (bug:Infestation) => {
        // False if this infestation cannot be removed (ex. if you have to pay for at least three months
        // once you get the package)
        // TODO
        return true;
    }
    getButtonStatus = (bug:Infestation) => {
        if (this.containsInfestation(bug)){
            return 'on';
        } else if (this.isPendingInfestation(bug)){
            return 'pending';
        } else if (this.isPendingRemoval(bug)){
            return 'removing';
        } else {
            return 'off';
        }
    }
    getInfestations = ():Infestation[] => {
        //  returns a list of the infestations that are part of the user's plan, not including the prevention plan
        //TODO
        return []
    }
    getPendingInfestations = ():Infestation[] => {
        // returns a list of the infestations that are pending, not including the prevention plan
        // TODO
        return []
    }
    getOtherInfestations = ():Infestation[] => {
        //This includes Pending Infestations and anything not currently on the plan, not including the prevention plan
        return []
    }
    getProducts = ():Product[] => {
        //TODO
        return []
    }
    getCurrentPrice = ():number => {
        // Returns the current price of the plan
        return 10.99
    }
    getNewPrice = ():{monthly: number, upFront: number} => {
        // Returns the new price of the plan, with the pending additions and deletions, as well as any upfront costs
        // which would come from new equipment
        return {monthly:11.99, upFront:0}
    }
    hasPendingChanges = () => {
        // Returns true if infestations are being added or removed from the plan, not if equipment is being bought
        return true;
    }
    removePendingChanges = () => {

    }
    addPendingAddition = (bug:Infestation) => {
        // Adds the infestation to the plan, but only pending. If it is already in the plan but pending removal,
        // removes from pending removal list. Otherwise does nothing.
    }
    addPendingRemoval = (bug:Infestation) => {
        // Removes the infestation to the plan, but only pending. If it is not in the plan but pending,
        // removes from pending list.
    }
}
