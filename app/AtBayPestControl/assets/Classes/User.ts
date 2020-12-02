// Each User will have a Plan, and information. The payment information can't be stored on the database, but I think
// I read there's a way to have an internal database as well, and this class would be in charge of reading that as well
// Also the user information will determine all the state details of the app

import Plan from "./Plan";
import Equipment from "./Equipment";
import Email from "./Email"
import Address from "./Address";
import Product from "./Product";
import Payment from "../Classes/Payment"
import {PAY} from "../Data/allPayments"
import images from "../images";
import {storeUser} from "../Data/Storage";
import Infestation from "./Infestation";
import {getEmailAddrByID, getAddrByID, getPaymentByID, save} from "../Data/Data";


interface UserProps {
    name: string,
    password: string,
    emails: Array<number>,
    addresses: Array<number>,
    payments: Array<number>,
    defaultAddress: Address,
    profilePic: NodeRequire,
    backgroundPic: NodeRequire,
    id: number
    userPlan: Plan
    currentEquipment: Array<number>
    removedEquipment: Array<number>,
    loggedIn: boolean
}

interface UserasJSON {
    id: 0,
    userPlan: string;
    currentEquipment: Array <number>,
    removedEquipment: Array <number>,
    name: string,
    password: string,
    emails: Array<number>,
    addresses: Array<number>,
    payments: Array<number>,
    defaultAddress: string,
    loggedIn: boolean
}
export default class User implements UserProps{
    //TODO: Add all of the personal information here and have it be used by Profile tab

    // If this is 0, that should mean they haven't made an account yet
    emails: Array<number> = [];
    addresses: Array<number> = [];
    payments: Array<number> = [];
    defaultAddress: Address = new Address();
    name: string = "";
    password: string = "";
    profilePic: NodeRequire = images.user.profile_picture;
    backgroundPic: NodeRequire = images.user.background;
    id: number = 0;
    userPlan = new Plan();
    currentEquipment: Array<number> = [];
    removedEquipment: Array<number> = [];
    loggedIn: boolean = false;
    static theUser: User

    constructor(id:number = 0){
            if(!User.theUser) {
                User.theUser = this;
                console.log("The User constructor has been called!");
            }
            return User.theUser;
    }

    private stringList = (arr: Array<number>) => {
        let ids: Array<number> = [];
        arr.forEach(
            function (eq){
                ids.push(eq)
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
                emails: this.stringList(this.emails),
                addresses: this.stringList(this.addresses),
                payments: this.stringList(this.payments),
                defaultAddress: this.defaultAddress.toString(),
                name: this.name,
                password: this.password,
                loggedIn: this.loggedIn
            }
        );
    }

    //In theory: we don't need all this set stuff
    //But in practice, we keep on getting duplicates and this is an easy way to check against that
    fromString = (jsonString: string) => {
        let json = JSON.parse(jsonString) as UserasJSON;

        this.userPlan = new Plan().fromString(json.userPlan);
        this.defaultAddress = new Address().fromString(json.defaultAddress);
        this.id = json.id;
        this.loggedIn = json.loggedIn;
        let curEq = new Set(this.currentEquipment);
        let remEq = new Set(this.removedEquipment);
        let setEmails = new Set(this.emails);
        let setAddresses = new Set(this.addresses);
        let setPayments = new Set(this.payments);

        json.currentEquipment.forEach(
            (id) =>{
                curEq.add(id);
            }
        );
        json.removedEquipment.forEach(
            (id) =>{
                remEq.add(id);
            }
        );

        json.emails.forEach(
            (id) =>{
                setEmails.add(id);
            }
        );

        json.addresses.forEach(
            (id) =>{
                setAddresses.add(id);
            }
        );

        json.payments.forEach(
            (id) =>{
                setPayments.add(id);
            }
        );

        this.removedEquipment = [...remEq];
        this.currentEquipment = [...curEq];
        this.emails = [...setEmails];
        this.addresses = [...setAddresses];
        this.payments = [...setPayments];
        return this;
    }

    delete = () => {
        console.log("User.delete() called");
        this.emails = []
        this.addresses = []
        this.payments= []
        this.defaultAddress = new Address(0);
        this.name ="";
        this.password="";
        this.profilePic = images.error;
        this.backgroundPic = images.error;
        this.id= 0;
        this.userPlan = this.userPlan.delete();
        this.currentEquipment = [];
        this.removedEquipment = [];
        this.loggedIn = false;
        User.theUser = this;
        save();
        //TODO: Delete from online database
    }

    hasAccount = () => {
        //I'm assuming this means something with signing up, so I'm just gonna return true
        return this.loggedIn;
    }

    logIn = () => {
        this.loggedIn = true;
    }
    logOut = () => {
        this.loggedIn = false;
    }
    isLoggedIn = () => {
        return this.loggedIn;
    }
    getPlan = () => {
        return this.userPlan;
    }
    hasEquipment = (equipment:Equipment) => {
        return this.currentEquipment.includes(equipment.getID());
    }

    //getPendingEquipment
    hadEquipment = (equipment:Equipment) => {
        return this.removedEquipment.includes(equipment.getID());
    }
    removeEquipment = (equipment:Equipment) => {
        // This removes the equipment from the list of equipment the user has, but adds it to a list of equipment
        // the user once owned

        const mID = equipment.getID();
        const curSet = new Set(this.currentEquipment);
        const pastSet = new Set(this.removedEquipment);

        if (curSet.has(mID)) {

            // Removes from current equipment
            curSet.delete(mID);
            this.currentEquipment = [... curSet];

            // Adds to removed equipment
            pastSet.add(mID);
            this.removedEquipment = [... pastSet];
        }
        save();
    }
    removeEquipmentNotReceived = (equipment:Equipment) => {
        // This removes equipment that the user never actually received without adding it to the removed list,
        // because it was deleted before it was purchased or shipped
        const curSet = new Set(this.currentEquipment);

        if (curSet.has(equipment.getID())){
            curSet.delete(equipment.getID());
        }

        this.currentEquipment = [...curSet];
        save();
    }
    addEquipment = (equipment:Equipment) => {
        // This adds the equipment to the list of equipment the user has, and also adds it to the upcoming
        // purchases in the plan

        this.addHasEquipment(equipment);
        this.userPlan.addPendingEquipment(equipment);
        save();
    }
    addHasEquipment = (equipment:Equipment) => {
        // This ONLY adds the equipment to the list of equipment the user has

        const curSet = new Set(this.currentEquipment);
        const pastSet = new Set(this.removedEquipment)

            // Adds to current equipment
        curSet.add(equipment.getID());
        this.currentEquipment = [...curSet];
        save();
    }

    removeManyEquipment = (removingEquipment:Equipment[]) => {
        // This removes multiple equipment that was never purchased
        for (let equipment of removingEquipment){
            this.removeEquipmentNotReceived(equipment);
        }
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

    getEmailByID = (emailID: number) => {
        return getEmailAddrByID(emailID);
    }

    getAddressByID = (addressID: number) => {
        return getAddrByID(addressID);
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
        // Adds the email to the list of emails
        const newEmailSet = new Set(this.emails);
        newEmailSet.add(email.getID());
        this.emails = [... newEmailSet];
        save()
    }

    addAddress = (address: Address) => {
        const newAddressSet = new Set(this.addresses);
        newAddressSet.add(address.getID());
        this.addresses = [... newAddressSet];
        save();
    }

    addPayment = (payment: Payment) => {
        const newPaymentSet = new Set(this.payments);
        newPaymentSet.add(payment.getID());
        this.payments = [... newPaymentSet];
        save();
    }

    validateUser = () => {
        return this.validateAddress() == '' && this.validateCity() == '' && this.validateEmail() == ''
            && this.validatePassword() == '' && this.validateState() == '' && this.validateZip() == ''
    }

    validateEmail = () => {
        let index = this.getEmails().length - 1;
        if (this.getEmailByID(index).getEmail().length != 0 && this.getEmailByID(index).getEmail().includes('@')
            && this.getEmailByID(index).getEmail().includes('.')) return '';
        else return 'Please enter a valid email';
    }

    validatePayment = (index: number) => {

    }

    validateAddress = () => {
        let index = this.getAddresses().length - 1
        if (this.getAddressByID(index).getAddress.length != 0) return '';
        else return 'Please enter a valid address'
    }

    validateCity = () => {
        let index = this.getAddresses().length - 1
        if (this.getAddressByID(index).getCity().length != 0) return ''
        else return 'Please enter a valid address'
    }

    validateState = () => {
        let index = this.getAddresses().length - 1
        if (this.getAddressByID(index).getState().length != 0) return ''
        else return 'Please enter a valid state'
    }

    validateZip = () => {
        let index = this.getAddresses().length - 1
        if (this.getAddressByID(index).getZip().length != 0) return ''
        else return 'Please enter a valid zip code'
    }

    validatePassword = () => {
        if (this.getPassword().length > 5 && this.getPassword().length <= 20) return ''
        else return 'Password must be at least 5 characters long'
    }

    getLatest = () => {
        if (this.emails.length === 0){
            return 0;
        } else {
            return this.emails.length -1;
        }
    }
}
