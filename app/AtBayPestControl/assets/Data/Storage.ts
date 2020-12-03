import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../Classes/User';
import {db} from "../../src/config";

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
            u = u.fromString(value);
        }
        return u;
    } catch(e) {
        throw Error('loadUser failed to save User data');
    }
}

const userDatabase = db.ref('users')
const passwordDatabase = db.ref('passwords')
const equipmentToSendDatabase = db.ref('equipmentToSend')
const productsChangedDatabase = db.ref('productsChanged')

const products = ():string => {
    let products:string = '';
    User.theUser.getPlan().getProducts().forEach((product, index) => {
        if(index == 0){
            products = product.getProductName();
        } else {
            products = products + ', ' + product.getProductName();
        }
    })
    return products;
}

export const updateUserOnline = (onError = ()=>{}, onSuccess = ()=>{}, onStolenUsername = onError) => {
    if(User.theUser.getID() === '0'){
        addNewUser(onError, onSuccess, onStolenUsername);
    } else {
        userDatabase.child(User.theUser.getID()).update({
            userString: User.theUser.toString(),
            email: User.theUser.getLatestEmail().getEmail(),
            address:User.theUser.getLatestAddress().getReadable(),
            products:products(),
            paymentDate: User.theUser.getPlan().getDueDate(),
            paymentsDue: User.theUser.getPendingPayment()
        }).then(onSuccess,onError)
    }
}

export const getUserFromOnline = (username:string,
                                  password:string,
                                  onError = ()=>{},
                                  onSuccess = ()=>{},
                                  onInvalid = ()=>{},
                                  onDNE = () => {}) => {
    let readUser = (userID:string) => {
        userDatabase.child(userID).once('value').then(
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

    passwordDatabase.child(username).once('value').then(
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
        passwordDatabase.child(User.theUser.getUserName()).once('value').then(
            snapshot => {
                if(snapshot.val() === null){
                    passwordDatabase.child(User.theUser.getUserName()).set({
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
        email: User.theUser.getLatestEmail().getEmail(),
        address:User.theUser.getLatestAddress().getReadable(),
        products:products(),
        paymentDate: User.theUser.getPlan().getDueDate(),
        paymentsDue: User.theUser.getPendingPayment()
    }).then(setKey, onError);
}

export const deleteUser = (onError = ()=>{}, onSuccess = ()=>{}) => {
    userDatabase.child(User.theUser.getID()).remove().then(
        () => {
            passwordDatabase.child(User.theUser.getUserName()).remove().then(onSuccess, onError)
        },
        onError
    )
}
