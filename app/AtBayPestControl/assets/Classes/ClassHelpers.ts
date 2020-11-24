import {getBugByID, getEquipmentByID, getProductByID} from "../Data/Data";

export function makeArray(arr: Array<any>, type: string){
    let j: any[] = [];
    switch (type){
        case "equipment":
            arr.forEach(function (n) {
                j.push(getEquipmentByID(n));
            });
            break;

        case "product":
            arr.forEach(function (n) {
                j.push(getProductByID(n));
            });
            break;

        case "infestation":
        case "bug":
            arr.forEach(function (n) {
                j.push(getBugByID(n));
            });
            break;


    }
    return j;
}
