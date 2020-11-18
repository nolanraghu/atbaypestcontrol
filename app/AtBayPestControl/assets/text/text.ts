import Equipment from "../Classes/Equipment";
import Product from "../Classes/Product";
import Infestation from "../Classes/Infestation";
import Plan from "../Classes/Plan";

//Overarching app text
export function appName(){
    return "AtBay Pest Control";
}
export function tab1label(){
    return "Packages";
}
export function tab2label(){
    return "Your Plan";
}
export function tab3label(){
    return "Profile";
}

//Potentially general use text
    // Different ways to make caption images for various situations
export function captionProductDescription(product:Product){
    return product.getProductName() + ':\n' + product.getProductDetails();
}
export function captionProductAndReqEquipment(product:Product){
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
    // MUST ADD LINK if owned is true, and onceOwned if it is false. They probably shouldn't be optional...

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
function lostProduct(){
    return "Click here if you no longer have this item and would like to purchase it again\n"
}
function foundProduct(){
    return "Click here if you already have this product\n"
}

//Bugs Screen Text
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
export function updatePlan(newPlan:boolean){
    // This button updates the plan
    if(newPlan){
        return "Update Plan";
    } else {
        return "Purchase";
    }

}
export function deleteChanges(){
    return "Delete Pending Changes";
}
    //Bug Info Popup Text
export function infestationName(infestation:Infestation){
    return infestation.getBugName() + " Infestation";
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
export function priceText(monthlyPrice:number,
                          upFrontPrice: number,
                          equipmentPrice: number,
                          adding: boolean,
                          purchasing: boolean){
    let text:string = '';
    if (adding) {
        text = "Price to add: A one time charge of $" + upFrontPrice +
            ', then ' + (monthlyPrice + equipmentPrice) + ' per month';
        return text;

    } else if (purchasing) {
        return "Cost: $" + equipmentPrice;
    } else {
        return "Price difference if removed: $" + monthlyPrice + ' per month';
    }

}
    //Update Popup Text
export function confirmationTitle(deleting: boolean, isChangingPlan: boolean){
    if (deleting) {
        return "Confirm Delete Changes:";
    } else if (isChangingPlan) {
        return "Confirm Update Plan:";
    } else {
        return "Confirm Purchase:";
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
export function confirmPayment(){
    return "Payment Information:"
}
export function confirmationNotes(plan:Plan, isChangingPlan:boolean, highlight:any){
    let price = plan.getNewPrice();
    let currentMonthly = plan.getCurrentPrice();
    let todayCharge = price.upFront;
    let day = plan.getDueDate();

    let todayText:string;
    if (todayCharge < 0){
        todayText = "Today you will be refunded ";
    } else {
        todayText = "Your total charge today will be ";
    }

    let changeText:string;
    if (currentMonthly != 0){
        changeText = ', instead of $' + currentMonthly;
    } else {
        changeText = '';
    }

    let notesText = [highlight(todayText + "$" + todayCharge + '.')];
    if (isChangingPlan){
        notesText = notesText.concat([" Then, your card will automatically be billed ",
            highlight("$" + price.monthly + " on the " + dateText(day) + " of each month"),
            changeText + ". You will receive an email reminder before that day each month. If you need " +
            "a new product before it is scheduled to ship, you can purchase it from the \'"
            + tab2label() + "\' tab."]);
    }
    return notesText;
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
export function newPriceTextFooter(plan:Plan){
    let price = plan.getNewPrice();
    let text = "New monthly cost: $" + price.monthly + " per month";
    if (price.upFront > 0){
        text = text + ", plus a one time charge of $" + price.upFront;
    }
    return text;
}

//Plan Screen Text
export function noProductText(){
    return "Nothing here yet! Go to the packages page to start adding products to your plan!";
}

//Profile Screen Text


















