// Each Plan will have Infestations, which have Products. We'll want a getProductList function
// We'll also need each plan to have a start date for each infestation, and the dates ordered for each product,
// as well as if each product has been received. This all needs to be stored in the Plan, not the product or
// Infestation!
//
// This is because the Product and Infestation will be what Brandon edits, whereas the plan is based on what the
// customer does

import Infestation from "./Infestation";

export default class Plan {
    private id: number
    constructor(id:number){
        this.id = id;
    }

    containsInfestation = (bug:Infestation) => {
        // TODO
        return false;
    }

    isPendingInfestation = (bug:Infestation) => {
        //TODO
        return false;
    }

    getButtonStatus = (bug:Infestation) => {
        if (this.containsInfestation(bug)){
            return 'on'
        } else if (this.isPendingInfestation(bug)){
            return 'pending'
        } else {
            return 'off'
        }
    }
}