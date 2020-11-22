import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../Classes/User';

export const storeUser = async (value: User) => {
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
