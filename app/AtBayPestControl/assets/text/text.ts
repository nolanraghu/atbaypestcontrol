import Equipment from "../Classes/Equipment";
import Product from "../Classes/Product";
import Infestation from "../Classes/Infestation";
import Plan from "../Classes/Plan";

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
