// Each User will have a Plan, and information. The payment information can't be stored on the database, but I think
// I read there's a way to have an internal database as well, and this class would be in charge of reading that as well
// Also the user information will determine all the state details of the app

import Plan from "./Plan";
import Equipment from "./Equipment";
import Email from "./Email"
import Address from "./Address";
import Product from "./Product";
import {storeUser} from "../Data/Storage";
import {save} from "../Data/Data";
import Payment from "../Classes/Payment"
import {PAY} from "../Data/allPayments"
import images from "../images/index"

interface UserProps {
    name: string,
    password: string,
    emails: Array<Email>,
    addresses: Array<Address>,
    payments: Array<Payment>,
    defaultAddress: Address,
    profilePic: NodeRequire,
    backgroundPic: NodeRequire,
    id: Number
    userPlan: Plan
    currentEquipment: Array<Equipment>
    removedEquipment: Array<Equipment>,
}

interface UserasJSON {
    id: 0,
    userPlan: string;
    currentEquipment: Array <number>;
    removedEquipment: Array <number>;

}
export default class User implements UserProps{
    //TODO: Add all of the personal information here and have it be used by Profile tab

    // If this is 0, that should mean they haven't made an account yet
    emails: Array<Email> = new Array<Email>();
    addresses: Array<Address> = new Array<Address>(new Address());
    payments: Array<Payment> = new Array<Payment>(PAY[0], PAY[1]);
    defaultAddress: Address = new Address();
    name: string = "";
    password: string = "";
    profilePic: NodeRequire = images.user.profile_picture;
    backgroundPic: NodeRequire = images.user.background;
    id: Number = 0;
    userPlan = new Plan();
    currentEquipment: Array<Equipment> = [];
    removedEquipment: Array<Equipment> = [];

    constructor(id:number = 0){
            console.log("The User constructor has been called!");
    }

    private stringList = (arr: Array<Equipment>) => {
        let ids: Array<number> = [];
        arr.forEach(
            function (equipment){
                ids.push(equipment.getID())
            }
        );
        return ids;
    }

    toString = () => {
        return JSON.stringify(
            {
                id: this.id,
                userPlan: this.userPlan.toString(),
                currentEquipment: this.stringList(this.currentEquipment),
                removedEquipment: this.stringList(this.removedEquipment),
            }
        );
    }

    fromString = (jsonString: string) => {
        let json = JSON.parse(jsonString) as UserasJSON;

        this.userPlan = new Plan().fromString(json.userPlan);
        this.id = json.id;
        json.currentEquipment.forEach(
            (id) =>{
                this.currentEquipment.push(new Equipment(id));
            }
        );
        json.removedEquipment.forEach(
            (id) =>{
                this.removedEquipment.push(new Equipment(id));
            }
        );

        return this;
    }

    hasAccount = () => {
        //I'm assuming this means something with signing up, so I'm just gonna return true
        return true;

        //return this.id != 0
    }
    getPlan = () => {
        return this.userPlan;
    }
    hasEquipment = (equipment:Equipment) => {

        return this.currentEquipment.includes(equipment);

    }

    //getPendingEquipment
    hadEquipment = (equipment:Equipment) => {
        return this.removedEquipment.includes(equipment);
    }
    removeEquipment = (equipment:Equipment) => {
        // This removes the equipment from the list of equipment the user has, but adds it to a list of equipment
        // the user once owned

        const curSet = new Set(this.currentEquipment);
        const pastSet = new Set(this.removedEquipment);

        if (curSet.has(equipment)) {

            // Removes from current equipment
            curSet.delete(equipment);
            this.currentEquipment = [... curSet];

            // Adds to removed equipment
            pastSet.add(equipment);
            this.removedEquipment = [... pastSet];
        }
        save();
    }
    addEquipment = (equipment:Equipment) => {
        // This adds the equipment to the list of equipment the user has, and also adds it to the upcoming
        // purchases in the plan

        const curSet = new Set(this.currentEquipment);

        if (!curSet.has(equipment)) {
            this.addHasEquipment(equipment);
            this.userPlan.addPendingEquipment(equipment);
        }
        save();
    }
    addHasEquipment = (equipment:Equipment) => {
        // This ONLY adds the equipment to the list of equipment the user has

        const curSet = new Set(this.currentEquipment);

        if (!curSet.has(equipment)) {
            // Adds to current equipment
            curSet.add(equipment);
            this.currentEquipment = [...curSet];
        }
        save();
    }

    makePayment = (price:number) => {
        // TODO: but not related to the database
    }
    setMonthlyPayments = (price:number, nextDate:Date) => {
        // Note: the date of nextDate should be <= 28
        // TODO: but not related to the database
    }

    purchaseItems = (item:(Product|Equipment)[]) => {
        // Sends the list of items that the user has purchased (separate from the plan) to the client
        // TODO
        console.log("Purchased")
    }

    getUserName = () => {
        return this.name;
    }

    getPassword = () => {
        return this.password;
    }

    getEmails = () => {
        // returns default the users emails
        return this.emails;
    }

    getAddresses = () => {
        // returns default the users addresses
        return this.addresses;
    }

    getPayments = () => {
        // returns default the users addresses
        return this.payments;
    }

    getDefaultAddress = () => {
        // returns default shipping address
        return this.defaultAddress;
    }

    getProfilePic = () => {
        // Returns the profile picture of the user
        return this.profilePic;
    }

    getBackgroundPic = () => {
        // returns background picture the user has selected
        return this.backgroundPic;
    }

    getEmailByID = () => {
        // Get a specific Email by ID
        // Will be useful for the edit function
    }

    getAddressByID = () => {
        // Get a specific address by ID
        // Will be useful for the edit function
    }

    changeUserName = (name: string) => {
        // function for updating username, to be used when edit buttons are implemented correctly in the
        // profile page
        this.name = name;
    }

    changePassword = (password: string) => {
        // function for updating username, to be used when edit buttons are implemented correctly in the
        // profile page
        this.password = password;
    }

    changeProfilePicture = (img: string) => {
        // function for updating the profile picture, to be used when edit buttons are implemented correctly in the
        // profile page
    }

    changeBackgroundPic = (img: string) => {
        // function for updating background picture, to be used when edit buttons are implemented correctly in the
        // profile page
    }

    addEmail = (email: Email) => {
        this.getEmails().concat(email);
    }

    addAddress = (address: Address) => {
        this.getAddresses().concat(address)
    }

    addPayment = (payment: Payment) => {
        this.getPayments().concat(payment)
    }

}
