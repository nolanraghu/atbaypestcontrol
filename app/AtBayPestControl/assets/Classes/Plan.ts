// Each Plan will have Infestations, which have Products. We'll want a getProductList function
// We'll also need each plan to have a start date for each infestation, and the dates ordered for each product,
// as well as if each product has been received. This all needs to be stored in the Plan, not the product or
// Infestation!
//
// This is because the Product and Infestation will be what Brandon edits, whereas the plan is based on what the
// customer does

import Infestation from "./Infestation";
import Product from "./Product";
import Equipment from "./Equipment";
import {getInfestationInfo} from "../../controller/InfestationPulling";
import User from "./User";
import {storeUser} from "../Data/Storage";

interface PlanAsJsON {
    addingInfestations: Array<number>;
    removingInfestations: Array<number>;
    currentInfestations: Array<number>;
    pendingEquipment: Array<number>;
    dueDate: number;
}

export default class Plan {
    private myUser: User;
    private addingInfestations: Array<Infestation>
    private removingInfestations: Array<Infestation>
    private currentInfestations: Array<Infestation>
    private pendingEquipment: Array<Equipment>;
    private dueDate: number;


    constructor(user: User){
        this.myUser = user;
        this.addingInfestations = [];
        this.removingInfestations = [];
        this.currentInfestations = [];
        this.pendingEquipment = [];
        this.dueDate = -1;
    }

    private countPriceInfestation = (arr:Array<Infestation>) => {
                const target = {upfront: 0, monthly: 0};
                if (arr.length == 0) {
                    return target;
                } else {
                    arr.forEach(function (infestation) {
                        target.monthly += infestation.getMonthlyPrice();
                        target.upfront += infestation.getUpfrontPrice();
                    });
                }
                return target;
    }

    private countPriceEquipment = (arr: Array<Equipment>) => {
        let target = 0
        if (arr.length == 0) {
            return target;
        } else {
            arr.forEach(function (infestation) {
                target += infestation.getPrice();
            });
        }
        return target;
    }

    private countProducts = (arr:Array<Infestation>) => {
        let target: Product[] = [];
        arr.forEach(
            function (infestation){
                target.concat(infestation.getProducts());
            })
        return target;
    }

    private stringList = (arr: Array<Infestation>) => {
        let ids: Array<number> = [];
        arr.forEach(
            function (infestation){
                ids.push(infestation.getID())
            }
        );
        return ids;
    }

    private checkEquipment = (arr: Array<Infestation>) => {
        let target: Equipment[] = [];
        this.currentInfestations.forEach(
            function (infestation){
                infestation.getProducts().forEach(
                    function (product){
                        let e = product.getEquipmentList();
                        if(e.length > 0 && !target.includes(e[0])){
                            target.push(e[0]);
                        }
                    }
                )
            });
        return new Set(target);
    };



    toString = () => {
        let ids: Array<number> = [];
        this.pendingEquipment.forEach(
            function (infestation){
                ids.push(infestation.getID())
            }
        );
        return JSON.stringify(
            {
                addingInfestations: this.stringList(this.addingInfestations),
                removingInfestations: this.stringList(this.removingInfestations),
                currentInfestations: this.stringList(this.currentInfestations),
                pendingEquipment: ids,
                dueDate: this.dueDate,
            }
        );
    }

    fromString = (jsonString: string) => {
        let json = JSON.parse(jsonString) as PlanAsJsON;
        json.addingInfestations.forEach(
            (id) =>{
                this.addingInfestations.push(new Infestation(id));
            }
        );
        json.removingInfestations.forEach(
            (id) =>{
                this.removingInfestations.push(new Infestation(id));
            }
        );
        json.currentInfestations.forEach(
            (id) =>{
                this.currentInfestations.push(new Infestation(id));
            }
        );
        json.pendingEquipment.forEach(
            (id) =>{
                this.pendingEquipment.push(new Equipment(id));
            }
        );
        this.dueDate = json.dueDate;

        return this;
    }

    containsInfestation = (bug:Infestation) => {
        return this.currentInfestations.includes(bug);
    }
    isPendingInfestation = (bug:Infestation) => {
        return this.addingInfestations.includes(bug);
    }
    isPendingRemoval = (bug:Infestation) => {
        return this.removingInfestations.includes(bug);
    }
    isRemovable = (bug:Infestation) => {
        // False if this infestation cannot be removed (ex. if you have to pay for at least three months
        // once you get the package)
        // TODO
        return true;
    }
    getButtonStatus = (bug:Infestation) => {
        if (this.isPendingInfestation(bug)){
            return 'pending';
        } else if (this.isPendingRemoval(bug)){
            return 'removing';
        } else if (this.containsInfestation(bug)){
            return 'on';
        } else {
            return 'off';
        }
    }
    getInfestations = ():Infestation[] => {
        return this.currentInfestations.slice(1,);
    }
    getPendingInfestations = ():Infestation[] => {
        // returns a list of the infestations that are pending, not including the prevention plan
        return [new Infestation(1), new Infestation(2), new Infestation(3)].filter(
            x => !this.addingInfestations.includes(x));}

    getOtherInfestations = ():Infestation[] => {
        //This includes Pending Infestations and anything not currently on the plan, not including the prevention plan

        //Easily one of the sexiest implementations yet
        return [new Infestation(1), new Infestation(2), new Infestation(3)].filter(
            x => !this.getInfestations().includes(x));
    }
    getProducts = ():Product[] => {
        return this.countProducts(this.currentInfestations);
    }
    getPendingProducts = ():Product[] => {
        return this.countProducts(this.addingInfestations);
    }
    getPendingEquipment = ():Equipment[] => {
        return this.pendingEquipment;
    }
    getRemovingProducts = ():Product[] => {
        return this.countProducts(this.removingInfestations);
    }
    getCurrentPrice = ():number => {
        // Returns the current price of the plan
        return this.countPriceInfestation(this.currentInfestations).monthly;
    }
    getNewPrice = ():{monthly: number, upfront: number} => {
        // Returns the new price of the plan, with the pending additions and deletions, as well as any upfront costs
        // which would come from new equipment. Remember that the upfront cost is just the sum of the pending upfront
        // costs plus the pending equipment cost, while the monthly is the sum of the pending and existing packages'
        // monthly price, minus the ones being removed
        let currents = this.countPriceInfestation(this.currentInfestations);
        let removes = this.countPriceInfestation(this.removingInfestations);
        let additions = this.countPriceInfestation(this.addingInfestations);
        currents.monthly += additions.monthly - removes.monthly;
        currents.upfront += additions.upfront - removes.upfront;
        return currents;
    }


    hasPendingChanges = () => {
        return this.removingInfestations.length > 0 || this.addingInfestations.length > 0;
    }
    removePendingChanges = () => {
        // Removes anthing pending on the plan and sets it back to what it was before, including equipment

        this.addingInfestations = [];
        this.removingInfestations = [];
        storeUser(this.myUser);
    }
    addChangesToPlan = () => {
        //TODO: This should send all of this.pendingEquipment to the client (Ortho/Brandon)
        // and clear pending equipment

        var curSet = new Set(this.currentInfestations);
        var minusSet = new Set(this.removingInfestations);
        var plusSet = new Set(this.addingInfestations);

        for (let elem of minusSet){
            //Send removal orders to client
            curSet.delete(elem);
        }
        for (let elem of plusSet){
            //Send new infestation to client
            curSet.add(elem);
        }
        this.currentInfestations = [...curSet];
        this.addingInfestations = [...plusSet];
        this.removingInfestations = [...minusSet];
        this.pendingEquipment = [];
        storeUser(this.myUser);

    }
    addPendingInfestation = (bug:Infestation) => {
        // Adds the infestation to the plan, but only pending. If it is already in the plan but pending removal,
        // removes from pending removal list. Otherwise does nothing.


        const minusSet = new Set(this.removingInfestations);
        const plusSet = new Set(this.addingInfestations);
        if(minusSet.has(bug)){
            minusSet.delete(bug);
            this.removingInfestations = [...minusSet];

        } else {
            plusSet.add(bug);
            this.addingInfestations = [...plusSet];
        }
        storeUser(this.myUser);

    }


    removePendingInfestation = (bug:Infestation) => {
        // Removes the infestation to the plan, but only pending. If it is not in the plan but pending,
        // removes from pending list. IMPORTANT: If it is removed from the pending list, it needs to also remove
        // the equipment from the pending equipment list, UNLESS it is needed for another infestation that is part of
        // the plan or Pending being added


        const curSet = new Set(this.currentInfestations);
        const minusSet = new Set(this.removingInfestations);
        const plusSet = new Set(this.addingInfestations);

        if(curSet.has(bug)){
            minusSet.add(bug);
            this.removingInfestations = [...minusSet];
            this.currentInfestations = [...curSet];
        } else if (plusSet.has(bug)){
            plusSet.delete(bug);
            this.addingInfestations = [...plusSet];
            let bugEq = this.checkEquipment([bug]);
            let curEq = this.checkEquipment(this.currentInfestations);
            let pendEq = this.checkEquipment(this.addingInfestations);
            let removeEq = this.checkEquipment(this.removingInfestations);
            let otherPendEq = new Set(this.pendingEquipment);

            for(let eqq of bugEq){
                if(removeEq.has(eqq)){
                    otherPendEq.delete(eqq);
                } else if( !(curEq.has(eqq) || pendEq.has(eqq))){
                    otherPendEq.delete(eqq);
                }
            }
            this.pendingEquipment = [...otherPendEq];


        }
        storeUser(this.myUser);

    }

    addPendingEquipment = (e: Equipment) =>{
        const eset = new Set(this.pendingEquipment);
        eset.add(e);
        this.pendingEquipment = [...eset];
        storeUser(this.myUser);

    }

    removePendingEquipment = (e: Equipment) => {
        const eset = new Set(this.pendingEquipment);
        eset.delete(e);
        this.pendingEquipment = [...eset];
        storeUser(this.myUser);

    }

    getDueDate = () => {
        //Gets the day the payments are due. If it hasn't been set, return today's date (ie 5 for the 5th)
        return this.dueDate != -1? this.dueDate: new Date().getDate();
    }
    setDueDate = (date:number) => {
        // Sets 'date' as the new due date in the database, and returns the next date that the customer will have to pay
        let setDate = date;
        // This is so you can't set the due date to be the 31st, then only have to pay every other month...
        if (date > 28){
            setDate = 1;
        }

        // Also make sure it works if they're in a different time zone...? And then this will have to somehow schedule
        // the automatic payments...

        this.dueDate = setDate;
        // Returns the next due date
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        month++;
        if (date >= 28){
            month++
        }
        if (month > 11){
            month -= 12;
            year++;
        }
        storeUser(this.myUser);
        return new Date(year, month, setDate);
    }
}
