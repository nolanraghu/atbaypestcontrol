// Each User will have a Plan, and information. The payment information can't be stored on the database, but I think
// I read there's a way to have an internal database as well, and this class would be in charge of reading that as well
// Also the user information will determine all the state details of the app

import Plan from "./Plan";
import Equipment from "./Equipment";
import Email from "./Email"
import Address from "./Address";
import Product from "./Product";
import Payment from "../Classes/Payment"
import images from "../images";
import {addItemToSend} from "../Data/Storage";
import {save} from "../Data/Data";


interface UserProps {
    name: string
    password: string
    emails: Array<Email>
    addresses: Array<Address>
    payments: Array<Payment>
    profilePic: NodeRequire
    backgroundPic: NodeRequire
    id: string
    userPlan: Plan
    currentEquipment: Array<number>
    removedEquipment: Array<number>
    loggedIn: boolean
    pendingPayments: number
}

interface UserasJSON {
    id: string,
    userPlan: string;
    currentEquipment: Array <number>,
    removedEquipment: Array <number>,
    name: string,
    password: string,
    emails: Array<string>,
    addresses: Array<string>,
    payments: Array<string>,
    loggedIn: boolean,
    pendingPayments: number
}
export default class User implements UserProps{
    // If this is 0, that should mean they haven't made an account yet
    emails: Array<Email> = [];
    addresses: Array<Address> = [];
    payments: Array<Payment> = [];
    name: string = "";
    password: string = "";
    profilePic: NodeRequire = images.user.profile_picture;
    backgroundPic: NodeRequire = images.user.background;
    id: string = '0';
    userPlan = new Plan();
    currentEquipment: Array<number> = [];
    removedEquipment: Array<number> = [];
    loggedIn: boolean = false;
    pendingPayments: number = 0;
    static theUser: User

    constructor(){
        if(!User.theUser) {
            User.theUser = this;
            console.log("The User constructor has been called!");
        }
        return User.theUser;
    }

    private stringList = (arr: Array<any>) => {
        let ids: Array<string> = [];
        arr.forEach(
            function (eq){
                ids.push(eq.toString())
            }
        );
        return ids;
    }




    toString = () => {
        return JSON.stringify(
            {
                id: this.id,
                userPlan: this.userPlan.toString(),
                currentEquipment: this.currentEquipment,
                removedEquipment: this.removedEquipment,
                emails: this.stringList(this.emails),
                addresses: this.stringList(this.addresses),
                payments: this.stringList(this.payments),
                name: this.name,
                password: this.password,
                loggedIn: this.loggedIn,
                pendingPayments: this.pendingPayments
            }
        );
    }

    //In theory: we don't need all this set stuff
    //But in practice, we keep on getting duplicates and this is an easy way to check against that
    fromString = (jsonString: string) => {
        let json = JSON.parse(jsonString) as UserasJSON;

        this.userPlan = new Plan().fromString(json.userPlan);
        this.id = json.id;
        this.name = json.name;
        this.password = json.password;
        this.loggedIn = json.loggedIn;
        this.pendingPayments = json.pendingPayments;
        let curEq = new Set<number>();
        let remEq = new Set<number>();
        let setEmails = new Set<Email>();
        let setAddresses = new Set<Address>();
        let setPayments = new Set<Payment>();

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
                setEmails.add(new Email().fromString(id));
            }
        );

        json.addresses.forEach(
            (id) =>{
                setAddresses.add(new Address().fromString(id));
            }
        );

        json.payments.forEach(
            (id) =>{
                setPayments.add(new Payment().fromString(id));
            }
        );

        this.removedEquipment = [...remEq];
        this.currentEquipment = [...curEq];
        this.emails = [...setEmails];
        this.addresses = [...setAddresses];
        this.payments = [...setPayments];
        save();
        return this;
    }

    delete = () => {
        console.log("User.delete() called");
        //deleteUser(this.name, this.id,() => makeAlert(deleteUserError()) );
        this.emails = [];
        this.addresses = [];
        this.payments = [];
        this.name ="";
        this.password="";
        this.id= '0';
        this.userPlan = this.userPlan.delete();
        this.currentEquipment = [];
        this.removedEquipment = [];
        this.loggedIn = false;
        this.profilePic= images.user.profile_picture;
        this.backgroundPic = images.user.background;
        this.pendingPayments = 0;
        User.theUser = this;
        save();
    }
    getID = () => {
        return this.id;
    }
    setID = (newID:string) => {
        this.id = newID;
        save();
    }
    logIn = () => {
        this.loggedIn = true;
        save();
    }
    logOut = () => {
        this.loggedIn = false;
        save();

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
        this.pendingPayments += price;
        save();
    }

    resetPendingPayments = () => {
        this.pendingPayments = 0;
        save();
    }

    getPendingPayment = () => {
        return this.pendingPayments;
    }

    setMonthlyPayments = (price:number, nextDate:Date) => {
        // Note: the date of nextDate should be <= 28
        // TODO: but not related to the database
    }

    purchaseItems = (item:(Product|Equipment)) => {
        addItemToSend(item);
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

    setEmails = (emailStrings:string[]) => {
        let newEmails:Email[] = [];
        for (let emailString of emailStrings){
            newEmails.push(new Email(emailString));
        }
        this.emails = newEmails;
        save();
    }

    setAddresses = (addressStrings:string[]) => {
        let newAddresses:Address[] = [];
        for (let addressString of addressStrings){
            newAddresses.push(new Address());
            newAddresses[newAddresses.length - 1].setFromString(addressString);
        }
        this.addresses = newAddresses;
        save();
    }

    getAddresses = () => {
        // returns default the users addresses
        return this.addresses;
    }

    getPayments = () => {
        // returns default the users addresses
        return this.payments;
    }

    getProfilePic = () => {
        // Returns the profile picture of the user
        return this.profilePic;
    }

    getBackgroundPic = () => {
        // returns background picture the user has selected
        return this.backgroundPic;
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

    addEmail = (email: Email, defaultEmail:boolean = false) => {
        // Adds the email to the list of emails
        if (defaultEmail) {
            this.emails = [email].concat(this.emails)
        } else {
            this.emails.push(email)
        }
        save()
    }

    addAddress = (address: Address, defaultAddress:boolean = false) => {
        if (defaultAddress) {
            this.addresses = [address].concat(this.addresses)
        } else {
            this.addresses.push(address)
        }
        save();
    }

    addPayment = (payment: Payment, defaultPayment:boolean = false) => {
        if (defaultPayment) {
            this.payments = [payment].concat(this.payments);
        } else {
            this.payments.push(payment);
        }
        save();
    }

    setDefaultPayment = (newDefault: number) => {
        if (this.payments.length > newDefault){
            let newDefaultPayment = this.payments[newDefault];
            this.payments[newDefault] = this.payments[0];
            this.payments[0] = newDefaultPayment;
        }
    }

    deletePayment = (deleteIndex: number) => {
        if (this.payments.length > deleteIndex){
            this.payments.splice(deleteIndex, 1)
        }
    }

    hasPayment = () => {
        return this.payments.length > 0;
    }

    validateUser = () => {
        return this.validateAddress() == '' && this.validateCity() == '' && this.validateEmail() == ''
            && this.validateAddress2() == '' && this.validatePassword() == '' && this.validateState() == '' && this.validateZip() == ''
    }

    validateUserName = () => {
        if (this.getUserName().length != 0) return '';
        else return 'Please enter a valid username'
    }

    validateEmail = () => {
        if (this.defaultEmail().getEmail().length != 0 && this.defaultEmail().getEmail().includes('@')
            && this.defaultEmail().getEmail().includes('.')) return '';
        else return 'Please enter a valid email';
    }

    validatePayment = (index: number) => {
    }

    validateAddress = () => {
        if (this.defaultAddress().getAddress().length != 0) return '';
        else return 'Please enter a valid address'
    }

    validateAddress2 = () => {
        return '';
    }


    validateCity = () => {
        if (this.defaultAddress().getCity().length != 0) return ''
        else return 'Please enter a valid address'
    }

    validateState = () => {
        if (this.defaultAddress().getState().length != 0) return ''
        else return 'Please enter a valid state'
    }

    validateZip = () => {
        if (this.defaultAddress().getZip().length != 0) return ''
        else return 'Please enter a valid zip code'
    }

    validatePassword = () => {
        if (this.getPassword().length > 5 && this.getPassword().length <= 20) return ''
        else return 'Password must be at least 5 characters long'
    }

    defaultEmail = () => {
        if (this.emails.length == 0){
            let newEmail = new Email();
            this.emails = [newEmail];
            return newEmail;
        } else {
            console.log("hello?");
            return this.emails[0];
        }
    }

    defaultAddress = () => {
        if (this.addresses.length == 0){
            let newAddress = new Address();
            this.addresses = [newAddress];
            return newAddress;
        } else {
            return this.addresses[0];
        }
    }
}
