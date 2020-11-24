import {getBugByID, getEquipmentByID, getProductByID} from "../Data/Data";

export function makeArray(arr: Array<any>, type: string){
    let j: any[] = [];
    switch (type){
        case "equipment":
        case "equipments":
        case "e":
            arr.forEach(function (n) {
                j.push(getEquipmentByID(n));
            });
            break;

        case "product":
        case "products":
        case "p":
            arr.forEach(function (n) {
                j.push(getProductByID(n));
            });
            break;

        case "infestation":
        case "bug":
        case "infestations":
        case "bugs":
        case "i":
            arr.forEach(function (n) {
                j.push(getBugByID(n));
            });
            break;


    }
    return j;
}
