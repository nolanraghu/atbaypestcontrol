// This will be very simple, including probably a picture and a name, perhaps a description and instructions,
// all straight from the database

export default class Equipment {
    private id: number
    constructor(id:number){
        this.id = id;
    }
    getEquipmentImage = () => {
        //TODO
        return require('../images/product3.jpg')
    }
    getEquipmentDescription = () => {
        //TODO
        return 'This product sprays.'
    }
    getEquipmentName = () => {
        //TODO
        return 'Sprayer'
    }
}