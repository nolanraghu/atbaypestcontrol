import Equipment from "../Classes/Equipment";
import Product from "../Classes/Product";
import Infestation from "../Classes/Infestation";
import Plan from "../Classes/Plan";
import {requiredPlanTime} from "../Data/Data";

export function appName(){
    return "AtBay Pest Control";
}
export function infestationName(infestation:Infestation){
    return infestation.getBugName() + " Infestation";
}
export function noProductText(){
    return "Nothing here yet! Go to the packages page to start adding products to your plan!";
}
export function noInfestationProductText(){
    return "We currently are not selling products to handle this infestation. Please check again later!";
}
export function productsIntro(adding:boolean){
    if(adding){
        return "Products to be added:"
    } else {
        return "Products on your plan:"
    }

}
export function productEquipmentText(adding: boolean){
    if (adding) {
        return "You will also receive this equipment:";
    } else {
        return "Equipment to repurchase:";
    }
}
export function productOwnedEquipmentText(adding: boolean){
    if (adding) {
        return "You will need this equipment, which you should already have:";
    } else {
        return "Equipment needed for these products:"
    }
}
export function captionProductDescription(product:Product){
    return product.getProductName() + ':\n' + product.getProductDetails();
}
export function captionProductandReqEquipment(product:Product){
    let equipmentText:string = '';
    let equipment:Equipment[] = product.equipmentList();
    for(let i = equipment.length - 1; i >= 0; i--){
        if(i == equipment.length - 1){
            equipmentText = equipment[i].getEquipmentName();
        } else if (i == equipment.length - 2) {
            equipmentText = equipment[i].getEquipmentName() + " and " + equipmentText;
        } else {
            equipmentText = equipment[i].getEquipmentName() + ", " + equipmentText;
        }
    }
    equipmentText = "\nYou will need the " + equipmentText + " to apply this product."
    return product.getProductName() + ':\n' + product.getProductDetails() + equipmentText;
}
export function captionEquipmentDescription(equipment:Equipment){
    return equipment.getEquipmentName() + ':\n' + equipment.getEquipmentDescription();
}
export function equipmentDescription(equipment:Equipment,
                                     products:Product[],
                                     owned:boolean,
                                     linkFunction?:any,
                                     onceOwned?:boolean){
    // The text used to describe equipment in a list of equipment needed for an infestation.
    // MUST ADD LINK if owned is true

    // This will say the list of products the equipment is needed for
    // (ex. 'Bugkiller spray, cockroach spray, and Ant Spray')
    let productText:string = '';
    for(let i = products.length - 1; i >= 0; i--){
        if(i == products.length - 1){
            productText = products[i].getProductName();
        } else if (i == products.length - 2) {
            productText = products[i].getProductName() + " and " + productText;
        } else {
            productText = products[i].getProductName() + ", " + productText;
        }
    }

    // Sets the text explaining that this is the equipment needed for a certain
    // product, using equipmentDescription. It's in an array so you can add a link
    let equipmentText:string[] | any = [
        'This is the ' +
        equipment.getEquipmentName() +
        '. You will need it to apply the ' +
        productText +
        '.\n'
    ];

    // This is the link to set the equipment to no longer owned, ex. if the customer lost a product. Note that
    // the link will not display correctly if it is below the picture, because it wrapped around, but this is
    // unlikely to be a problem, so I didn't think it was worth it to fix
    if (owned) {
        equipmentText.push(linkFunction(lostProduct()));
    } else if (onceOwned){
        equipmentText.push(linkFunction(foundProduct()));
    }

    // This is the description of the equipment
    equipmentText.push(equipment.getEquipmentDescription());
    return equipmentText;
}
export function lostProduct(){
    return "Click here if you no longer have this item and would like to purchase it again\n"
}
export function foundProduct(){
    return "Click here if you already have this product\n"
}
export function newPriceText(plan:Plan){
    // This is when you are about to update your plan from bugs tab
    let price = plan.getNewPrice();
    let changing = price.monthly != plan.getCurrentPrice();

    if(changing){
        let text = "New Price: \n$" + price.monthly + ' per month';
        if (price.upFront != 0) {
            text = text + ', \nplus $' + price.upFront + ' for equipment'
        }
        return text;
    } else {
        if (price.upFront != 0) {
            let text = "New equipment: $" + price.upFront;
            if (plan.hasPendingChanges()){
                text += "\nNo price change"
            }
            return text;
        } else {
            return "No price change"
        }
    }
}
export function priceText(price:number, equipmentPrice: number, adding: boolean, purchasing: boolean){
    let text:string = '';
    if (adding) {
        text = "Price to add: $" + price + ' per month';

        if (equipmentPrice != 0) {
            text = text + ', plus a one-time equipment fee of ' + equipmentPrice;
        }

        return text;

    } else if (purchasing) {
        return "Cost: $" + equipmentPrice;
    } else {
        return "Price difference if removed: $" + price + ' per month';
    }

}
export function updatePlan(newPlan:boolean){
    // This button updates the plan
    if(newPlan){
        return "Update Plan";
    } else {
        return "Purchase";
    }

}
export function changePlan(adding: boolean, purchasing: boolean){
    // This button adds or removes the infestation from the plan, or purchases the missing equipment
    if (adding){
        return "Add to Plan";
    } else if(purchasing) {
        return "Purchase Equipment";
    } else {
        return "Remove from Plan"
    }
}
export function confirmButton(deleting: boolean, isChangingPlan: boolean){
    if (deleting) {
        return "Delete";
    } else if (isChangingPlan) {
        return "Update";
    } else {
        return "Purchase";
    }
}
export function confirmationTitle(deleting: boolean, isChangingPlan: boolean){
    if (deleting) {
        return "Confirm Delete Changes:";
    } else if (isChangingPlan) {
        return "Confirm Update Plan:";
    } else {
        return "Confirm Purchase:";
    }
}
export function newProductsConfirm(deleting: boolean){
    if(deleting){
        return "I don't need these products:";
    } else {
        return "New products:";
    }
}
export function removeProductsConfirm(deleting: boolean){
    if(deleting){
        return "I still want to receive these products:";
    } else {
        return "Products being removed:";
    }
}
export function newEquipmentConfirm(deleting: boolean){
    if(deleting){
        return "I won't need this equipment";
    } else {
        return "New equipment:";
    }
}
export function confirmationNotes(plan:Plan){
    //TODO I think it would be good to have the prices highlighted, or important information
    let price = plan.getNewPrice();
    let currentMonthly = plan.getCurrentPrice();
    let remainingPrice = monthlyRemaining(currentMonthly);
    let todayCharge = price.monthly - remainingPrice + price.upFront;
    //TODO round todayCharge to the nearest cent, probably rounding up
    let day = new Date().getDate();

    let todayText;
    if (todayCharge < 0){
        todayText = "Today you will be refunded $";
    } else {
        todayText = "Your total charge today will be $";
    }

    return todayText + todayCharge + ". Then, your credit card will automatically " +
        "be billed $" + price.monthly + " on the " + dateText(day) + " of each month. Once you subscribe to a " +
        "new infestation plan, you must keep it for at least " + requiredPlanTime() + " before you unsubscribe."
}
function dateText(date:number){
    switch (date){
        case 1:
            return "1st";
        case 2:
            return "2nd";
        case 3:
            return "3rd";
        default:
            return date + "th";
    }
}
function monthlyRemaining(monthly:number){
    //TODO This isn't correct
    return (monthly / 30) * (30 - new Date().getDate())
}
export function newPriceTextFooter(plan:Plan){
    let price = plan.getNewPrice();
    let text = "New monthly cost: $" + price.monthly + " per month";
    if (price.upFront > 0){
        text = text + ", plus a one time charge of $" + price.upFront;
    }
    return text;
}