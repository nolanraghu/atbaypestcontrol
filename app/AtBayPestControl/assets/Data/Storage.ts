import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../Classes/User';
import {db} from "../../src/config";
import Equipment from "../Classes/Equipment";
import Product from "../Classes/Product";

export const storeUser = async (value: User) => {
    console.log("storeUser started off")
    try {
        const jsonValue = value.toString();
        await AsyncStorage.setItem('user', jsonValue)
    } catch (e) {
        throw Error('storeData failed to save User data');
    }
}

export const loadUser = async () => {
    try {
        let u = new User();
        const value = await AsyncStorage.getItem('user')
        if(value !== null) {
            u.fromString(value);
        }
        return u;
    } catch(e) {
        throw Error('loadUser failed to save User data');
    }
}

const userDatabase = db.ref('users')
const passwordDatabase = db.ref('passwords')
const itemsToSendDatabase = db.ref('equipmentToSend')
const productsChangedDatabase = db.ref('productsChanged')
const userDeletedDatabase = db.ref('usersDeleted')

const products = ():string => {
    let products:string = '';
    User.theUser.getPlan().getProducts().forEach((product, index) => {
        if(index == 0){
            products = product.getName();
        } else {
            products = products + ', ' + product.getName();
        }
    })
    return products;
}

function cleanPath(path:string){
    let retval:string = path;
    retval = retval.replace(/\./g, '');
    retval = retval.replace(/#/g, '');
    retval = retval.replace(/$/g, '');
    retval = retval.replace(/\[/g, '');
    retval = retval.replace(/]/g, '');

    if (retval === ''){
        return ' ';
    } else {
        return retval;
    }
}

export const updateUserOnline = (onError = ()=>{}, onSuccess = ()=>{}, onStolenUsername = onError) => {
    if(User.theUser.getID() === '0'){
        addNewUser(onError, onSuccess, onStolenUsername);
    } else {
        userDatabase.child(cleanPath(User.theUser.getID())).update({
            userString: User.theUser.toString(),
            email: User.theUser.defaultEmail().getEmail(),
            address:User.theUser.defaultAddress().getReadable(),
            products:products(),
            paymentDate: User.theUser.getPlan().getDueDate(),
            paymentsDue: User.theUser.getPendingPayment().toFixed(2)
        }).then(onSuccess,onError)
    }
}

export const updateUsernamePasswordOnline = (onError = ()=>{},
                                             onSuccess = ()=>{},
                                             onStolenUsername = onError) => {
    let setKey = () => {
        let userKey = User.theUser.getID();
        passwordDatabase.child(cleanPath(User.theUser.getUserName())).once('value').then(
            snapshot => {
                if(snapshot.val() === null || snapshot.val().userID === userKey){
                    passwordDatabase.child(cleanPath(User.theUser.getUserName())).set({
                        userID: userKey,
                        password: User.theUser.getPassword()
                    }).then(onSuccess, onError);
                } else {
                    onStolenUsername();
                }
            }, onError
        )

    }

    updateUserOnline(onError, setKey, onStolenUsername)
}

export const getUserFromOnline = (username:string,
                                  password:string,
                                  onError = ()=>{},
                                  onSuccess = ()=>{},
                                  onInvalid = ()=>{},
                                  onDNE = () => {}) => {
    let readUser = (userID:string) => {
        userDatabase.child(cleanPath(userID)).once('value').then(
            snapshot => {
                if (snapshot.val() === null){
                    onError()
                } else {
                    let userString = snapshot.val().userString;
                    User.theUser.fromString(userString);
                    User.theUser.setID(userID);
                    onSuccess();
                }
            },
            onError
        )
    }

    passwordDatabase.child(cleanPath(username)).once('value').then(
        snapshot => {
            if(snapshot.val() === null){
                onDNE();
            } else {
                let readPassword = snapshot.val().password;
                let readID = snapshot.val().userID;
                if (readPassword === password){
                    readUser(readID);
                } else {
                    onInvalid();
                }
            }
        },
        onError
    )
}

export const addNewUser = (onError = ()=>{}, onSuccess = ()=>{}, onUsernameExists = onError) => {
    let userKey:string;

    let setKey = (val:any) => {
        userKey = val.key;
        User.theUser.setID(userKey);
        passwordDatabase.child(cleanPath(User.theUser.getUserName())).once('value').then(
            snapshot => {
                if(snapshot.val() === null){
                    passwordDatabase.child(cleanPath(User.theUser.getUserName())).set({
                        userID: userKey,
                        password: User.theUser.getPassword()
                    }).then(onSuccess, onError);
                } else {
                    onUsernameExists();
                }
            }, onError
        )

    }

    userDatabase.push({
        userString: User.theUser.toString(),
        email: User.theUser.defaultEmail().getEmail(),
        address:User.theUser.defaultAddress().getReadable(),
        products:products(),
        paymentDate: User.theUser.getPlan().getDueDate(),
        paymentsDue: User.theUser.getPendingPayment().toFixed(2)
    }).then(setKey, onError);
}

export const deleteUser = (username:string, userID:string, onError = ()=>{}, onSuccess = ()=>{}) => {
    userDatabase.child(cleanPath(userID)).remove().then(
        () => {
            userDeletedDatabase.push(username);
            passwordDatabase.child(cleanPath(username)).remove().then(onSuccess, onError);
        },
        onError
    )
}

export const addItemToSend = (item:Equipment|Product, onError = ()=>{}, onSuccess = ()=>{}) => {
    itemsToSendDatabase.child(cleanPath(item.getName())).child(cleanPath(User.theUser.getUserName())).set(
        User.theUser.defaultAddress().getReadable()
    ).then(onSuccess,onError)
}

export const addChangedProductsOnline = (product:Product, add:boolean, onError = ()=>{}, onSuccess = ()=>{}) => {
    let adding = add? 'added to plan':'removed from plan'
    let addingObject = {
        now: adding,
        address: User.theUser.defaultAddress().getReadable()
    }
    productsChangedDatabase.child(cleanPath(product.getName())).child(cleanPath(User.theUser.getUserName())).set(
        addingObject
    ).then(onSuccess,onError);
}