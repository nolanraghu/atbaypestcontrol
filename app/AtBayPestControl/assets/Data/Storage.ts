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

export const updateUserOnline = (onError = ()=>{}, onSuccess = ()=>{}):boolean => {
    if(User.theUser.getID() === '0'){
        return addNewUser(onError,onSuccess);
    } else {
        userDatabase.child(User.theUser.getID()).update({
            userString: User.theUser.toString()
        })

        let successful = true;
        if(successful){
            onSuccess();
        } else {
            onError()
        }
        return successful;
    }
}

export const getUserFromOnline = (username:string,
                                  password:string,
                                  onError = ()=>{},
                                  onSuccess = ()=>{},
                                  onInvalid = ()=>{}) => {
    let readUser = (userID:string) => {
        userDatabase.child(userID).once('value').then(
            snapshot => {
                let userString = snapshot.val().userString;
                User.theUser.fromString(userString);
                User.theUser.setID(userID);
                onSuccess();
            },
            onError
        )
    }

    passwordDatabase.child(username).once('value').then(
        snapshot => {
            let readPassword = snapshot.val().password;
            let readID = snapshot.val().userID;
            if (readPassword === password){
                readUser(readID);
            } else {
                onInvalid();
            }
        },
        onError
    )
}

export const addNewUser = (onError = ()=>{}, onSuccess = ()=>{}):boolean => {
    let successful = false;
    let userKey = userDatabase.push({
        userString: User.theUser.toString()
    }).key;
    if(userKey != null){
        User.theUser.setID(userKey);
        passwordDatabase.child(User.theUser.getUserName()).set({
            userID: userKey,
            password: User.theUser.getPassword()
        })
        successful = true;
    }

    console.log(User.theUser.toString())

    if(successful){
        onSuccess();
    } else {
        onError()
    }
    return successful;
}
