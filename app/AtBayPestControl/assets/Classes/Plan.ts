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
import {getBugByID, getBugsList, getEquipmentByID, getProductByID, save} from "../Data/Data";
import {makeArray} from "./ClassHelpers";
import {addChangedProductsOnline, addItemToSend} from "../Data/Storage";

interface PlanAsJsON {
    addingInfestations: Array<number>;
    removingInfestations: Array<number>;
    currentInfestations: Array<number>;
    pendingEquipment: Array<number>;
    dueDate: number;
}

export default class Plan {
    private addingInfestations: Array<number> = []
    private removingInfestations: Array<number> = []
    private currentInfestations: Array<number> = []
    private pendingEquipment: Array<number> = []
    private dueDate: number = -1;
    static thePlan: Plan;

    constructor(){
        if(!Plan.thePlan) {
            Plan.thePlan = this;
        }
        return Plan.thePlan;
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
            arr.forEach(function (eq) {
                target += eq.getPrice();
            });
        }
        return target;
    }

    private countProducts = (arr:Array<Infestation>) => {
        let target: Product[] = [];
        arr.forEach(
            function (infestation){
                target = target.concat(makeArray(infestation.getProducts(), "product"));
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

        let target:Set<Equipment> = new Set();
        arr.forEach(
            function (infestation){
                infestation.getProducts().forEach(
                    function (product){
                        let e = getProductByID(product).getEquipmentList();
                        e.forEach(
                            function (equipment){
                                target.add(getEquipmentByID(equipment));
                            }
                        )
                    }
                )
            });
        return target;
    };



    toString = () => {
        let ids: Array<number> = [];
        this.pendingEquipment.forEach(
            function (infestation){
                ids.push(infestation)
            }
        );
        return JSON.stringify(
            {
                addingInfestations: this.stringList(makeArray(this.addingInfestations, 'infestation')),
                removingInfestations: this.stringList(makeArray(this.removingInfestations, 'infestation')),
                currentInfestations: this.stringList(makeArray(this.currentInfestations, 'infestation')),
                pendingEquipment: ids,
                dueDate: this.dueDate,
            }
        );
    }

    //In theory: we don't need all this set stuff
    //But in practice, we keep on getting duplicates and this is an easy way to check against that
    fromString = (jsonString: string) => {
        let json = JSON.parse(jsonString) as PlanAsJsON;
        let addSet = new Set(this.addingInfestations);
        let minusSet = new Set(this.removingInfestations);
        let curSet = new Set(this.currentInfestations);
        let pendEquip = new Set(this.pendingEquipment);
        json.addingInfestations.forEach(
            (id) =>{
                addSet.add(id);
            }
        );
        json.removingInfestations.forEach(
            (id) =>{
                minusSet.add(id);
            }
        );
        json.currentInfestations.forEach(
            (id) =>{
                curSet.add(id);
            }
        );
        json.pendingEquipment.forEach(
            (id) =>{
                pendEquip.add(id);
            }
        );
        this.pendingEquipment = [...pendEquip];
        this.addingInfestations = [...addSet];
        this.removingInfestations = [...minusSet];
        this.currentInfestations = [...curSet];

        this.dueDate = json.dueDate;

        return this;
    }

    delete = () => {
        this.addingInfestations = []
        this.removingInfestations = []
        this.currentInfestations = []
        this.pendingEquipment = []
        this.dueDate = -1;
        Plan.thePlan = this;
        return this;
    }

    containsInfestation = (bug:Infestation) => {
        return this.currentInfestations.includes(bug.getID());
    }
    isPendingInfestation = (bug:Infestation) => {
        return this.addingInfestations.includes(bug.getID());
    }
    isPendingRemoval = (bug:Infestation) => {
        return this.removingInfestations.includes(bug.getID());
    }
    isRemovable = (bug:Infestation) => {
        // False if this infestation cannot be removed (ex. if you have to pay for at least three months
        // once you get the package)
        let today = new Date().getTime();
        let expiryDay = bug.getPaymentExpiryDate().getTime();
        return today >= expiryDay;
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
        return makeArray(this.currentInfestations, "infestation").filter((infestation:Infestation) => {
            return !infestation.isPreventionPlan();
        });
    }
    getPendingInfestations = ():Infestation[] => {
        // returns a list of the infestations that are pending, not including the prevention plan
        return makeArray(this.addingInfestations, "infestation").filter((infestation:Infestation) => {
            return !infestation.isPreventionPlan();
        });


    }


    getOtherInfestations = ():Infestation[] => {
        //This includes Pending Infestations and anything not currently on the plan, not including the prevention plan

        //Easily one of the sexiest implementations yet
        return getBugsList().filter(
            x => !(this.containsInfestation(x) || x.isPreventionPlan()));
    }
    getProducts = ():Product[] => {
        return this.countProducts(makeArray(this.currentInfestations, 'infestation'));
    }
    getPendingProducts = ():Product[] => {
        return this.countProducts(makeArray(this.addingInfestations, 'infestation'));
    }
    getPendingEquipment = ():Equipment[] => {
        return makeArray(this.pendingEquipment, 'equipment');
    }
    getRemovingProducts = ():Product[] => {
        return this.countProducts(makeArray(this.removingInfestations, 'infestation'));
    }
    getCurrentPrice = ():number => {
        // Returns the current price of the plan
        return this.countPriceInfestation(makeArray(this.currentInfestations, 'infestation')).monthly;
    }
    getNewPrice = ():{monthly: number, upfront: number} => {
        // Returns the new price of the plan, with the pending additions and deletions, as well as any upfront costs
        // which would come from new equipment. Remember that the upfront cost is just the sum of the pending upfront
        // costs plus the pending equipment cost, while the monthly is the sum of the pending and existing packages'
        // monthly price, minus the ones being removed
        let currents = this.countPriceInfestation(makeArray(this.currentInfestations, 'infestation'));
        let removes = this.countPriceInfestation(makeArray(this.removingInfestations, 'infestation'));
        let additions = this.countPriceInfestation(makeArray(this.addingInfestations, 'infestation'));
        let equipment = this.countPriceEquipment(makeArray(this.pendingEquipment, 'equipment'));
        let newPrice:{monthly:number, upfront:number} = {monthly:0, upfront:0};
        newPrice.monthly = additions.monthly - removes.monthly + currents.monthly;
        newPrice.upfront = additions.upfront + equipment;
        return newPrice;
    }


    hasPendingChanges = () => {
        return this.removingInfestations.length > 0 || this.addingInfestations.length > 0;
    }
    removePendingChanges = ():Equipment[] => {
        // Removes anything pending on the plan and sets it back to what it was before, including equipment
        // Returns the equipment that was going to be added, but then was not added.

        let equipmentRemoved = this.pendingEquipment;

        this.addingInfestations = [];
        this.removingInfestations = [];
        this.pendingEquipment = [];
        save();

        return equipmentRemoved.map(eID => getEquipmentByID(eID));
    }
    addChangesToPlan = () => {
        // Sends changes to client
        for (let equipment of this.pendingEquipment){
            addItemToSend(getEquipmentByID(equipment));
        }
        for (let product of this.countProducts(this.addingInfestations.map(id=>getBugByID(id)))){
            addChangedProductsOnline(product, true);
        }
        for (let product of this.countProducts(this.removingInfestations.map(id=>getBugByID(id)))){
            addChangedProductsOnline(product, false);
        }

        //Adds changes to plan locally
        let curSet = new Set(this.currentInfestations);
        let minusSet = new Set(this.removingInfestations);
        let plusSet = new Set(this.addingInfestations);

        for (let elem of minusSet){
            curSet.delete(elem);
        }
        for (let elem of plusSet){
            curSet.add(elem);
        }
        this.currentInfestations = [...curSet];
        this.addingInfestations = [];
        this.removingInfestations = [];
        this.pendingEquipment = [];

        if(this.currentInfestations == []){
            this.dueDate = -1;
        }

        save();

    }
    addPendingInfestation = (bug:Infestation) => {
        // Adds the infestation to the plan, but only pending. If it is already in the plan but pending removal,
        // removes from pending removal list. Otherwise does nothing.


        const minusSet = new Set(this.removingInfestations);
        const plusSet = new Set(this.addingInfestations);
        if(minusSet.has(bug.getID())){
            minusSet.delete(bug.getID());
            this.removingInfestations = [...minusSet];

        } else {
            plusSet.add(bug.getID());
            this.addingInfestations = [...plusSet];
        }
        save();

    }


    removePendingInfestation = (bug:Infestation):Equipment[] => {
        // Removes the infestation to the plan, but only pending. If it is not in the plan but pending,
        // removes from pending list. IMPORTANT: If it is removed from the pending list, it needs to also remove
        // the equipment from the pending equipment list, UNLESS it is needed for another infestation that is part of
        // the plan or Pending being added

        let removedEquipment = new Set<Equipment>();

        const curSet = new Set(this.currentInfestations);
        const minusSet = new Set(this.removingInfestations);
        const plusSet = new Set(this.addingInfestations);

        if(curSet.has(bug.getID())){
            minusSet.add(bug.getID());
            this.removingInfestations = [...minusSet];
            this.currentInfestations = [...curSet];
        } else if (plusSet.has(bug.getID())){
            plusSet.delete(bug.getID());
            this.addingInfestations = [...plusSet];

            let currNotRemovingInfestations:Infestation[] =
                makeArray(this.currentInfestations, 'infestation').filter(
                infestation => !this.isPendingRemoval(infestation)
            );

            let bugEq = this.checkEquipment([bug]);

            let curEq = this.checkEquipment(currNotRemovingInfestations);
            let pendEq = this.checkEquipment(makeArray(this.addingInfestations, 'infestation'));
            let otherPendEq = new Set(makeArray(this.pendingEquipment, 'equipment'));
            for(let eqq of bugEq){
                let remove = true;
                if(pendEq.has(eqq)){
                    remove = false;
                } else if(curEq.has(eqq)) {
                    remove = false;
                }
                if(remove){
                    removedEquipment.add(eqq);
                    otherPendEq.delete(eqq);
                }
            }
            this.pendingEquipment = [...otherPendEq];
        }
        save();
        return [...removedEquipment]
    }

    addPendingEquipment = (e: Equipment) =>{
        const eset = new Set(this.pendingEquipment);
        eset.add(e.getID());
        this.pendingEquipment = [...eset];
        save();

    }

    removePendingEquipment = (e: Equipment) => {
        const eset = new Set(this.pendingEquipment);
        eset.delete(e.getID());
        this.pendingEquipment = [...eset];
        save();

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
        save();
        return new Date(year, month, setDate);
    }
}
