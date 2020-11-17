// This will be very simple, including probably a picture and a name, perhaps a description and instructions,
// all straight from the database


interface EquipmentProps {
    id: number,
    image: NodeRequire,
    name: string,
    description: string,
    price: number
}

export default class Equipment {
    id: number;
    image: NodeRequire;
    name: string;
    description: string;
    price: number;
    constructor(props: EquipmentProps){
        this.id = props.id;
        this.image = props.image;
        this.name = props.name;
        this.description = props.description;
        this.price = props.price;
      }

    getEquipmentImage = () => {
        //TODO
        return require('../images/product3.jpg')
    }
    getEquipmentDescription = () => {
        //TODO
        return this.description

    }
    getEquipmentName = () => {
        //TODO
        return 'Sprayer'
    }
    getPrice = () => {
        //TODO
        return 3.00
    }
}
