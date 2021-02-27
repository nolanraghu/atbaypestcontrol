import Equipment from "../Classes/Equipment";
import Product from "../Classes/Product";
import Infestation from "../Classes/Infestation";
import Plan from "../Classes/Plan";
import {getPreventionPlan} from "../Data/Data";
import {makeArray} from "../Classes/ClassHelpers";

//Overarching app text
export function appName(){
    return "AtBay Pest Control";
}
export function tab1label(){
    return "Packages";
}
export function tab2label(){
    return "Your Products";
}
export function tab3label(){
    return "Profile";
}
export function errorTitle(){
    return 'Error'
}
export function userNotAddedError(){
    return 'Did not register user'
}
export function usernameExists(){
    return 'Username already exists'
}
export function notUpdated(){
    return 'Your profile did not get updated'
}
export function errorDismiss(){
    return 'OK'
}
export function errorCancel(){
    return 'Cancel'
}
export function usernameStolen(){
    return 'Oops! We messed up. Your username has been taken. Please contact support.'
}
export function loginError(){
    return 'Not able to access your account.'
}
export function deleteUserError(){
    return 'User not deleted online. Please contact support.'
}
export function notSavedText(){
    return "Your changes have not been saved"
}

//Potentially general use text
export function costText(price:number){
    return "Price: $" + price.toFixed(2);
}
export function confirmPayment(){
    return "Payment Information:"
}
    // Different ways to make caption images for various situations
export function captionProductDescription(product:Product){
    return product.getName() +
        ':\n' + product.getProductDetails() +
        productPrice(product);
}
export function captionProductAndReqEquipment(product:Product){
    let equipmentText:string = '';
    let equipment:Equipment[] = makeArray(product.getEquipmentList(), 'e');
    for(let i = equipment.length - 1; i >= 0; i--){
        if(i == equipment.length - 1){
            equipmentText = equipment[i].getName();
        } else if (i == equipment.length - 2) {
            equipmentText = equipment[i].getName() + " and " + equipmentText;
        } else {
            equipmentText = equipment[i].getName() + ", " + equipmentText;
        }
    }
    if (equipmentText.length != 0){
        equipmentText = "\nYou will need the " + equipmentText + " to apply this product."
    }
    return product.getName() + ':\n' + product.getProductDetails() + equipmentText + productPrice(product);
}
export function captionProductWithLink(product:Product, linkFunction:any){
    let text = orderEarly();
    return [linkFunction('Click here'), text + product.getProductDetails() + productPrice(product)];
}
function orderEarly(){
    return " to purchase more today instead of receiving it on your normal scheduled date.\n"
}
function productPrice(product:Product){
    return '\nThis item costs $' + product.getPrice().toFixed(2) +
    ' to reorder if you need it before your regular shipment date.'
}
export function captionEquipmentDescription(equipment:Equipment){
    return equipment.getName() + ':\n' + equipment.getEquipmentDescription() + equipmentPrice(equipment);
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
            productText = products[i].getName();
        } else if (i == products.length - 2) {
            productText = products[i].getName() + " and " + productText;
        } else {
            productText = products[i].getName() + ", " + productText;
        }
    }

    // Sets the text explaining that this is the equipment needed for a certain
    // product, using equipmentDescription. It's in an array so you can add a link
    let equipmentText:string[] | any = [
        'This is the ' +
        equipment.getName() +
        '. You will need it to apply the ' +
        productText +
        '.\n'
    ];

    // This is the link to set the equipment to no longer owned, ex. if the customer lost a product. Note that
    // the link will not display correctly if it is below the picture, because it wrapped around, but this is
    // unlikely to be a problem, so I didn't think it was worth it to fix
    if (owned) {
        equipmentText.push(linkFunction("Click here" + lostEquipment()));
    } else if (onceOwned){
        equipmentText.push(linkFunction("Click here" + foundEquipment()));
    }

    // This is the description of the equipment
    equipmentText.push(equipment.getEquipmentDescription() + equipmentPrice(equipment));
    return equipmentText;
}
export function justEquipmentDescription(equipment:Equipment, link:any){
    let text = lostEquipment();
    return [
        equipment.getName() + ":\n",
        link('Click here'),
        text + equipment.getEquipmentDescription(),
        equipmentPrice(equipment)
    ];
}
function lostEquipment(){
    return " if you no longer have this item and would like to purchase it again\n"
}
function foundEquipment(){
    return " if you already have this item\n"
}
function equipmentPrice(equipment:Equipment){
    return '\nThis item costs $' + equipment.getPrice().toFixed(2) + "."
}

//Bugs Screen Text
export function currentPriceText(plan:Plan){
    return "Current Plan: $" + plan.getCurrentPrice().toFixed(2) + " per month";
}
export function newPriceText(plan:Plan){
    // This is when you are about to update your plan from bugs tab
    let price = plan.getNewPrice();
    let changing = price.monthly != plan.getCurrentPrice();

    let oldPriceText = currentPriceText(plan);

    if(changing){
        let text = oldPriceText + "\nNew Plan: $" + price.monthly.toFixed(2) + ' per month';
        if (price.upfront != 0) {
            text = text + ', plus $' + price.upfront.toFixed(2) + ' for equipment and fees'
        }
        return text;
    } else {
        if (price.upfront != 0) {
            let text = "\nNew equipment: $" + price.upfront.toFixed(2);
            if (plan.hasPendingChanges()){
                text = " (This isn't changing)" + text
            }
            return oldPriceText + text;
        } else {
            return oldPriceText + " (This isn't changing)"
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
export function productPageDescription(){
    return "Use this screen to explore and edit the packages in your plan. Click on the package to learn " +
        "more about the pests treated, the products and equipment you will receive, and the package's price."
}
    //Bug Info Popup Text
export function infestationName(infestation:Infestation){
    if(infestation.isPreventionPlan()){
        return infestation.getBugName();
    } else {
        return infestation.getBugName();
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
        text = "Price to add: A one time charge of $" + (upFrontPrice + equipmentPrice).toFixed(2) +
            ', then $' + monthlyPrice.toFixed(2) + ' per month';
        return text;

    } else if (purchasing) {
        return "Cost: $" + equipmentPrice.toFixed(2);
    } else {
        return "Price difference if removed: $" + monthlyPrice.toFixed(2) + ' per month';
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
export function confirmationNotes(plan:Plan, isChangingPlan:boolean, highlight:any){
    let price = plan.getNewPrice();
    let currentMonthly = plan.getCurrentPrice();
    let todayCharge = price.upfront;
    let day = plan.getDueDate();

    let todayText:string;
    if (todayCharge < 0){
        todayText = "Today you will be refunded ";
    } else {
        todayText = "Your total charge today will be ";
    }

    let changeText:string;
    let recurringBillingText:string = " Then, your card will automatically be billed ";
    if (currentMonthly != 0 && currentMonthly != price.monthly){
        changeText = ', instead of $' + currentMonthly.toFixed(2);
    } else {
        changeText = '';
        if (currentMonthly == price.monthly){
            recurringBillingText = " Your card will continue to be automatically billed "
        }
    }

    let notesText = [highlight(todayText + "$" + todayCharge.toFixed(2) + '.')];
    if (isChangingPlan){
        notesText = notesText.concat([recurringBillingText,
            highlight("$" + price.monthly.toFixed(2) + " on the " + dateText(day) + " of each month"),
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
    let text = "New monthly cost: $" + price.monthly.toFixed(2) + " per month";
    if (price.upfront > 0){
        text = text + ", plus a one time charge of $" + price.upfront.toFixed(2);
    }
    return text;
}

//Plan Screen Text
export function noProductText(){
    return "Nothing here yet! Go to the packages page to start adding products to your plan!";
}
export function planTitle(plan:Plan){
    return "Your Plan: $" + plan.getCurrentPrice().toFixed(2) + " per month";
}
export function planBriefDescription(plan:Plan){
    const bugslist = plan.getInfestations();
    let infestationsText = '';
    for(let i = bugslist.length - 1; i >= 0; i--){
        if(i == bugslist.length - 1){
            infestationsText = bugslist[i].getBugName();
        } else if (i == bugslist.length - 2) {
            infestationsText = bugslist[i].getBugName() + " and " + infestationsText;
        } else {
            infestationsText = bugslist[i].getBugName() + ", " + infestationsText;
        }
    }

    let text:string = "With this plan, you receive the following products. Click on a product to learn more " +
        "about how to apply it, or to purchase extra before your regular shipment date."
    if(plan.containsInfestation(getPreventionPlan())){
        if (bugslist.length == 0){
            return "You are currently on the general prevention plan. " + text;
        } else {
            return "Your current plan includes the general prevention plan and the " +
                infestationsText + ". " + text;
        }
    } else {
        if (bugslist.length == 0){
            return "You are not currently signed up for a plan.";
        } else {
            return "Your current plan covers the " + infestationsText + ". " + text;
        }
    }
}
    //Plan Product Popup Text
export function equipmentListTitle(){
    return "To use this product, you will need:";
}
    //Confirm Purchase Text
export function confirmTitle(){
    return "Confirm Purchase"
}
export function confirmPurchaseButton(){
    return "Purchase"
}
export function confirmationNotesItems(cost:number, isProduct:boolean, highlight:any, product: any){
    let endText = isProduct?
        ". You will still receive your " + product.getName() + " on your normal delivery date, in addition to " +
        "the extra one that will be sent out today.":
        "."
    return ["Your card will be charged ", highlight("$" + cost.toFixed(2)), endText]
}
export function purchaseListTitle(){
    return "You will receive the following item:"
}

//Profile Screen Text
export function planText(){
    return "View Current Plan info";
}
export function defaultMarker(){
    return '(Default)';
}
export function noPaymentText(){
    return 'Add a payment method';
}
export function deleteProfile(){
    return 'Delete Profile'
}
    //Contact Us Screen
export function contactUs(){
    return 'Contact Us!'
}
export function contactUsDescription(){
    return 'Thank you for using Ortho products! Please direct technical difficulties to the team below'
}
    //Edit Profile Screen
export function submit(){
    return 'Update'
}
