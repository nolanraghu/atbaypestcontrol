// Each User will have a Plan, and information. The payment information can't be stored on the database, but I think
// I read there's a way to have an internal database as well, and this class would be in charge of reading that as well
// Also the user information will determine all the state details of the app

import Plan from "./Plan";
import Equipment from "./Equipment";
import Email from "./Email"
import Address from "./Address";


interface UserProps {
    name: string,
    emails: Array<Email>,
    addresses: Array<Address>,
    defaultAddress: Address,
    profilePic: NodeRequire,
    backgroundPic: NodeRequire
}

export default class User implements UserProps{
    // If this is 0, that should mean they haven't made an account yet
    private id: string
    emails: Array<Email> = new Array<Email>();
    addresses: Array<Address> = new Array<Address>();
    defaultAddress: Address = new Address();
    name: string = "";
    profilePic: NodeRequire = require("../images/error.jpg");
    backgroundPic: NodeRequire = require("../images/error.jpg");

    constructor(id:string = "0", name: string, emails: Array<Email>, addresses: Array<Address>,
                profilePic: NodeRequire, backGroundPic: NodeRequire){
        this.id = id;
        this.name = name;
        this.emails = emails;
        this.addresses = addresses;
        if (addresses.length != 0) this.defaultAddress = addresses[1];
        this.profilePic = profilePic;
        this.backgroundPic = backGroundPic;
    }
    hasAccount = () => {
        return this.id != "0"
    }
    getPlan = () => {
        //TODO
        return new Plan(0)
    }
    hasEquipment = (equipment:Equipment) => {
        //TODO
        return true;
    }
    hadEquipment = (equipment:Equipment) => {
        // This returns true if the user once had the equipment, but it has been removed
        //TODO
        return false;
    }
    removeEquipment = (equipment:Equipment) => {
        // This removes the equipment from the list of equipment the user has, but adds it to a list of equipment
        // the user once owned
        //TODO
    }
    addEquipment = (equipment:Equipment) => {
        // This adds the equipment to the list of equipment the user has, and also adds it to the upcoming
        // purchases in the plan
        //TODO
    }
    addHasEquipment = (equipment:Equipment) => {
        // This ONLY adds the equipment to the list of equipment the user has
        // TODO
    }
    makePayment = (price:number) => {
        // TODO: but not related to the database
    }
    setMonthlyPayments = (price:number, nextDate:Date) => {
        // Note: the date of nextDate should be <= 28
        // TODO: but not related to the database
    }

    getUserName = () => {
        return this.name;
    }

    getEmails = () => {
        // returns default the users emails
        return this.emails;
    }

    getAddresses = () => {
        // returns default the users addresses
        return this.addresses;
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
        return this.defaultAddress;
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

    }

    changeProfilPic = (img: string) => {

    }

    changeBackgroundPic = (img: string) => {

    }

}